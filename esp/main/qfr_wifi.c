
#include <qfr_wifi.h>

#include <stdio.h>

#include <freertos/FreeRTOS.h>
#include <freertos/event_groups.h>
#include <freertos/task.h>

#include <esp_err.h>
#include <esp_event.h>
#include <esp_log.h>
#include <esp_wifi.h>
#include <qrcode.h>

#include <wifi_provisioning/manager.h>
#include <wifi_provisioning/scheme_softap.h>

static const char* TAG = "qfr_wifi";

#define WIFI_CXN_EV     BIT0
#define WIFI_XPORT      "softap"
#define WIFI_QR         "v1"

static EventGroupHandle_t wifi_ev_group;

static void event_handler(void* arg, esp_event_base_t ev_base, 
                            int32_t ev_id, void* ev_data) {

    if (ev_base == WIFI_PROV_EVENT) {
        switch (ev_id) {
        case WIFI_PROV_START: 
            ESP_LOGI(TAG, "prov start");
            break; 
        case WIFI_PROV_CRED_RECV: 
        {
            wifi_sta_config_t* wifi_sta_cfg = (wifi_sta_config_t*) ev_data;
            ESP_LOGI(TAG, "cred recv ssid: %s", (const char*) wifi_sta_cfg->ssid);
            break; 
        }
        case WIFI_PROV_CRED_FAIL:
        {
            wifi_prov_sta_fail_reason_t* fail = (wifi_prov_sta_fail_reason_t*) ev_data;
            ESP_LOGE(TAG, "fail! %s", (*fail == WIFI_PROV_STA_AUTH_ERROR) ? 
                    "auth fail" : "ap not found");
            break;
        }
        case WIFI_PROV_CRED_SUCCESS: 
            ESP_LOGI(TAG, "prov success");
            break;
        case WIFI_PROV_END:
            wifi_prov_mgr_deinit();
            break;
        default:
            break;
        }
    } else if (ev_base == WIFI_EVENT) {
        switch (ev_id) {
        case WIFI_EVENT_STA_START:
            esp_wifi_connect();
            break;
        case WIFI_EVENT_STA_DISCONNECTED:
            ESP_LOGW(TAG, "disconnected. retrying");
            esp_wifi_connect();
            break;
        case WIFI_EVENT_AP_STACONNECTED:
            ESP_LOGI(TAG, "softap connected");
            break;
        case WIFI_EVENT_AP_STADISCONNECTED:
            ESP_LOGI(TAG, "softap disconnected");
            break;
        }
    } else if (ev_base == IP_EVENT && ev_id == IP_EVENT_STA_GOT_IP) {
        ip_event_got_ip_t* ev = (ip_event_got_ip_t*) ev_data;
        ESP_LOGI(TAG, "connected as" IPSTR, IP2STR(&ev->ip_info.ip));
        xEventGroupSetBits(wifi_ev_group, WIFI_CXN_EV);
    } else if (ev_base == PROTOCOMM_SECURITY_SESSION_EVENT) {
        switch (ev_id) {
        case PROTOCOMM_SECURITY_SESSION_SETUP_OK:
            ESP_LOGI(TAG, "secure session setup");
            break;
        case PROTOCOMM_SECURITY_SESSION_INVALID_SECURITY_PARAMS:
            ESP_LOGE(TAG, "recv invalid security params");
            break;
        case PROTOCOMM_SECURITY_SESSION_CREDENTIALS_MISMATCH:
            ESP_LOGE(TAG, "recv bad username and/or pop");
            break;
        default:
            break;
        }
    }
}

static void wifi_init_sta(void) {
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_start());
}

static void get_service_name(char* service_name, size_t max) {
    uint8_t eth_mac[6];
    const char* ssid_pfx = "PROV_";
    esp_wifi_get_mac(WIFI_IF_STA, eth_mac);
    snprintf(service_name, max, "%s%02X%02X%02X", ssid_pfx, 
                eth_mac[3], eth_mac[4], eth_mac[5]);
}

static void wifi_qr(const char* name, const char* username, const char* pop, 
                    const char* transport) {
    char payload[150] = {0};
    if (pop) {
        snprintf(payload, sizeof (payload), "{\"ver\":\"%s\",\"name\":\"%s\"" \
                    ",\"pop\":\"%s\",\"transport\":\"%s\"}", WIFI_QR, name,
                    pop, transport);
    } else {
        snprintf(payload, sizeof (payload), "{\"ver\":\"%s\",\"name\":\"%s\"" \
            ",\"transport\":\"%s\"}", WIFI_QR, name, transport);
    }

    esp_qrcode_config_t qr_cfg = ESP_QRCODE_CONFIG_DEFAULT();
    esp_qrcode_generate(&qr_cfg, payload);
}

void wifi_init(void) {
    ESP_ERROR_CHECK(esp_netif_init());

    ESP_ERROR_CHECK(esp_event_loop_create_default());
    wifi_ev_group = xEventGroupCreate();

    ESP_ERROR_CHECK(esp_event_handler_register(WIFI_PROV_EVENT, ESP_EVENT_ANY_ID,
                    &event_handler, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(PROTOCOMM_SECURITY_SESSION_EVENT,
                    ESP_EVENT_ANY_ID, &event_handler, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID,
                    &event_handler, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP,
                    &event_handler, NULL));

    esp_netif_create_default_wifi_sta();
    esp_netif_create_default_wifi_ap();

    wifi_init_config_t wifi_init_cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&wifi_init_cfg));

    wifi_prov_mgr_config_t prov_cfg = {
        .scheme = wifi_prov_scheme_softap,
        .scheme_event_handler = WIFI_PROV_EVENT_HANDLER_NONE
    };

    ESP_ERROR_CHECK(wifi_prov_mgr_init(prov_cfg));

    bool provd = false;
    ESP_ERROR_CHECK(wifi_prov_mgr_is_provisioned(&provd));

    if (!provd) {
        ESP_LOGI(TAG, "begin prov");
        char service_name[12];
        get_service_name(service_name, sizeof (service_name));

        const char* pop = "abcd1234";

        wifi_prov_security1_params_t* sec_params = pop;

        const char* username = NULL;

        const char* service_key = "qfrservicekey";

        ESP_ERROR_CHECK(wifi_prov_mgr_start_provisioning(WIFI_PROV_SECURITY_1,
                        (const void*) sec_params, service_name, service_key));

        wifi_qr(service_name, username, pop, WIFI_XPORT);
    } else {
        ESP_LOGI(TAG, "already prov'd, begin sta");
        wifi_prov_mgr_deinit();
        wifi_init_sta();
    }

    xEventGroupWaitBits(wifi_ev_group, WIFI_CXN_EV, true, true, portMAX_DELAY);
}

