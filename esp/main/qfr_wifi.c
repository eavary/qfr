
#include "qfr_wifi.h"

#include "esp_err.h"
#include "esp_event_base.h"
#include "esp_netif.h"
#include "esp_netif_ip_addr.h"
#include "esp_netif_types.h"
#include "esp_wifi_default.h"
#include "freertos/FreeRTOS.h"
#include "freertos/projdefs.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_dpp.h"
#include "esp_log.h"
#include "portmacro.h"
#include "qrcode.h"

#include <string.h>

static const char* TAG = "qfr_wifi";

wifi_config_t wifi_cfg;

static int wifi_retry_num = 0;

static EventGroupHandle_t wifi_event_group;

#define DPP_CONNECTED_BIT       BIT0
#define DPP_CONNECT_FAIL_BIT    BIT1
#define DPP_AUTH_FAIL_BIT       BIT2
#define WIFI_MAX_RETRY_NUM      3

// ???
#define DPP_CHANNEL_LIST        "6"

static void event_handler(void* arg, esp_event_base_t ev_base,
                        int32_t ev_id, void* ev_data) {
    if (ev_base == WIFI_EVENT && ev_id == WIFI_EVENT_STA_START) {
        ESP_ERROR_CHECK(esp_supp_dpp_start_listen());
        ESP_LOGI(TAG, "begin listen");
    } else if (ev_base == WIFI_EVENT && ev_id == WIFI_EVENT_STA_DISCONNECTED) {
        if (wifi_retry_num < WIFI_MAX_RETRY_NUM) {
            esp_wifi_connect();
            wifi_retry_num++;
            ESP_LOGI(TAG, "retry connection");
        } else {
            xEventGroupSetBits(wifi_event_group, DPP_CONNECT_FAIL_BIT);
        }
    } else if (ev_base == WIFI_EVENT && ev_id == WIFI_EVENT_STA_CONNECTED) {
        ESP_LOGI(TAG, "connected to ssid: %s", wifi_cfg.sta.ssid);
    } else if (ev_base == IP_EVENT && ev_id == IP_EVENT_STA_GOT_IP) {
        ip_event_got_ip_t* ev = (ip_event_got_ip_t*) ev_data;
        ESP_LOGI(TAG, "ip:" IPSTR, IP2STR(&ev->ip_info.ip));
        wifi_retry_num = 0;
        xEventGroupSetBits(wifi_event_group, DPP_CONNECTED_BIT);
    }
}

void wifi_event_cb(esp_supp_dpp_event_t ev, void* data) {
    switch (ev) {
    case ESP_SUPP_DPP_URI_READY:
        if (data != NULL) {
            esp_qrcode_config_t qr_cfg = ESP_QRCODE_CONFIG_DEFAULT();
            esp_qrcode_generate(&qr_cfg, (const char*) data);
        }
        break;
    case ESP_SUPP_DPP_CFG_RECVD:
        memcpy(&wifi_cfg, data, sizeof (wifi_cfg));
        wifi_retry_num = 0;
        esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_cfg);
        esp_wifi_connect();
        break;
    case ESP_SUPP_DPP_FAIL:
        if (wifi_retry_num < WIFI_MAX_RETRY_NUM) {
            ESP_LOGE(TAG, "wifi auth failed: %s", esp_err_to_name((int) data));
            ESP_ERROR_CHECK(esp_supp_dpp_start_listen());
            wifi_retry_num++;
        } else {
            xEventGroupSetBits(wifi_event_group, DPP_AUTH_FAIL_BIT);
        }
        break;
    default:
        break;
    }
}

// left as function for ease of adding cryptography
esp_err_t wifi_bootstrap(void) {
    return esp_supp_dpp_bootstrap_gen(DPP_CHANNEL_LIST, DPP_BOOTSTRAP_QR_CODE,
                                        NULL, 0);
}

void wifi_init(void) {
    wifi_event_group = xEventGroupCreate();

    ESP_ERROR_CHECK(esp_netif_init());
    
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    ESP_ERROR_CHECK(esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID,
                    &event_handler, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP,
                    &event_handler, NULL));

    wifi_init_config_t wifi_init_cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&wifi_init_cfg));

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_supp_dpp_init(wifi_event_cb));
    ESP_ERROR_CHECK(wifi_bootstrap());
    ESP_ERROR_CHECK(esp_wifi_start());

    EventBits_t ev_bits = xEventGroupWaitBits(wifi_event_group, 
            DPP_CONNECTED_BIT | DPP_CONNECT_FAIL_BIT | DPP_AUTH_FAIL_BIT, 
            pdFALSE, pdFALSE, portMAX_DELAY);

    if (ev_bits & DPP_CONNECTED_BIT) {
        ESP_LOGI(TAG, "connected to %s", wifi_cfg.sta.ssid);
    } else if (ev_bits & DPP_CONNECT_FAIL_BIT) {
        ESP_LOGE(TAG, "failed connection to %s", wifi_cfg.sta.ssid);
    } else if (ev_bits & DPP_AUTH_FAIL_BIT) {
        ESP_LOGE(TAG, "authentication failed after %d tries", wifi_retry_num);
    } else {
        ESP_LOGE(TAG, "UNEXPECTED EVENT");
    }

    esp_supp_dpp_deinit();
    ESP_ERROR_CHECK(esp_event_handler_unregister(IP_EVENT, IP_EVENT_STA_GOT_IP,
                    &event_handler));
    ESP_ERROR_CHECK(esp_event_handler_unregister(WIFI_EVENT, ESP_EVENT_ANY_ID,
                    &event_handler));
    vEventGroupDelete(wifi_event_group);
}

