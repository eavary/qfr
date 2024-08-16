
#include <qfr_mqtt.h>

#include <esp_err.h>
#include <esp_log.h>

#include <mqtt_client.h>

static const char* TAG = "qfr_mqtt";

// naive implementation:
//      TCP
//      no security
//      user & pass = qfr
//      qos 0

#define QFR_USER "qfr"
#define QFR_PASS "qfr"

static void mqtt_ev_handler(void* args, esp_event_base_t base,
                            int32_t ev_id, void* ev_data) {
    ESP_LOGI(TAG, "ev begin: base: %s; id: %"PRIi32, base, ev_id);
    esp_mqtt_event_handle_t ev = ev_data;
    esp_mqtt_client_handle_t client = ev->client;
    int msg_id;
    switch ((esp_mqtt_event_id_t) ev_id) {
    case MQTT_EVENT_CONNECTED:
        ESP_LOGI(TAG, "MQTT_EVENT_CONNECTED");
        msg_id = esp_mqtt_client_subscribe_single(client, "/arm", 0);
        ESP_LOGI(TAG, "sub to /arm, id: %d", msg_id);

        vTaskDelay(1000/portTICK_PERIOD_MS);

        msg_id = esp_mqtt_client_publish(client, "/arm", "hello", 0, 0, 0);
        ESP_LOGI(TAG, "publish to /arm, id: %d", msg_id);

        break;
    case MQTT_EVENT_DISCONNECTED:
        ESP_LOGI(TAG, "MQTT_EVENT_DISCONNECTED");
        break;
    case MQTT_EVENT_SUBSCRIBED:
        ESP_LOGI(TAG, "MQTT_EVENT_SUBSCRIBED, id: %d", ev->msg_id);
        break;
    case MQTT_EVENT_UNSUBSCRIBED:
        ESP_LOGI(TAG, "MQTT_EVENT_UNSUBSCRIBED, id: %d", ev->msg_id);
        break;
    case MQTT_EVENT_PUBLISHED:
        ESP_LOGI(TAG, "MQTT_EVENT_PUBLISHED, id: %d", ev->msg_id);
        break;
    case MQTT_EVENT_DATA:
        ESP_LOGI(TAG, "MQTT_EVENT_DATA");
        printf("TOPIC=%.*s\r\n", ev->topic_len, ev->topic);
        printf("DATA=%.*s\r\n", ev->data_len, ev->data);
        break;
    case MQTT_EVENT_ERROR:
        ESP_LOGE(TAG, "MQTT_EVENT_ERROR");
        break;
    default:
        ESP_LOGI(TAG, "other id: %d", ev->event_id);
        break;
    }
}

void arm_led(void) {
}

void qfr_mqtt_init(void) {
    esp_mqtt_client_config_t mqtt_cfg = {
        .broker.address.uri = "mqtt://mqtt.eclipseprojects.io", // testing
        .session.protocol_ver = MQTT_PROTOCOL_V_3_1_1,
    };

    esp_mqtt_client_handle_t mqtt_client = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_register_event(mqtt_client, MQTT_EVENT_ANY, 
            mqtt_ev_handler, NULL);
    ESP_ERROR_CHECK(esp_mqtt_client_start(mqtt_client));
}

