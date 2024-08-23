
#include <qfr_mqtt.h>

#include <qfr_event.h>
#include <qfr_gpio.h>
#include <qfr_skd.h>

#include <esp_err.h>
#include <esp_log.h>

#include <mqtt_client.h>

#include <string.h>

static const char* TAG = "qfr_mqtt";

// naive implementation:
//      TCP
//      no security
//      user & pass = qfr
//      qos 0

#define QFR_USER "qfr"
#define QFR_PASS "qfr"

static void qfr_mqtt_ev_handler(void* args, esp_event_base_t base,
                                int32_t ev_id, void* ev_data) {
    ESP_LOGI(TAG, "ev begin: base: %s; id: %"PRIi32, base, ev_id);
    esp_mqtt_event_handle_t ev = ev_data;
    esp_mqtt_client_handle_t client = ev->client;
    int msg_id;
    switch ((esp_mqtt_event_id_t) ev_id) {
    case MQTT_EVENT_CONNECTED:
        ESP_LOGI(TAG, "MQTT_EVENT_CONNECTED");

        msg_id = esp_mqtt_client_subscribe_single(client, "arm", 0);
        ESP_LOGI(TAG, "sub to arm, id: %d", msg_id);

        msg_id = esp_mqtt_client_subscribe_single(client, "disarm", 0);
        ESP_LOGI(TAG, "sub to disarm, id: %d", msg_id);

        msg_id = esp_mqtt_client_subscribe_single(client, "/schedule", 0);
        ESP_LOGI(TAG, "sub to /schedule, id: %d", msg_id);
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
    case MQTT_EVENT_ERROR:
        ESP_LOGE(TAG, "MQTT_EVENT_ERROR");
        break;
    case MQTT_EVENT_BEFORE_CONNECT:
        ESP_LOGI(TAG, "MQTT_EVENT_BEFORE_CONNECT");
        break;
    case MQTT_EVENT_DATA:
        ESP_LOGI(TAG, "MQTT_EVENT_DATA");
        break;
    default:
        ESP_LOGE(TAG, "other id: %d", ev->event_id);
        break;
    }
}

#define QFR_ARM         3
#define QFR_DISARM      6
#define QFR_SCHEDULE    8

static void qfr_mqtt_ev_data_handler(void* args, esp_event_base_t base, 
                                     int32_t ev_id, void* ev_data) {
    ESP_LOGI(TAG, "DATA HANDLER BEGIN");
    esp_mqtt_event_handle_t ev = ev_data;
//    char* topic = ev->topic;
    int topic_len = ev->topic_len;
    // switch on perfect hash (made by gperf) of available topics
    //      for arm,disarm,schedule -- perfect hash is simply length
    //      :. gperf omitted for brevity's sake
    switch (topic_len) {
        case QFR_ARM:
            qfr_gpio_led_on();
            break;
        case QFR_DISARM:
            qfr_gpio_led_off();
            break;
        case QFR_SCHEDULE: 
        {
            char buf[ev->data_len + sizeof (size_t)];
            *(size_t*)buf = ev->data_len;
            memcpy(buf + sizeof (size_t), ev->data, ev->data_len);
            esp_err_t post_err = esp_event_post(QFR_EVENT, QFR_EVENT_RECV_SKD, 
                                                buf, ev->data_len + sizeof (size_t), 
                                                portMAX_DELAY);
            if (post_err == ESP_ERR_TIMEOUT)
                esp_event_post(QFR_EVENT, QFR_EVENT_RECV_SKD, buf, 
                               ev->data_len + sizeof (size_t), portMAX_DELAY);
            else
                ESP_ERROR_CHECK(post_err);
            break;
        }
        default:
            ESP_LOGE(TAG, "UNEXPECTED TOPIC RECIEVED");
            break;
    }
}

/* HANDLERS MUST BE _SHORT_ */

// MAKE SEPARATE MQTT_EVENT_DATA HANDLER
// HAVE MQTT_INIT TAKE A POINTER TO A SKD
// POPULATE SKD WITH HANDLER (likely dispatch to thread), WHEN DONE, FIRE RECV_SKD EVENT
// ON RECV_SKD, WRITE TO FLASH AND START TIMER REG

void qfr_mqtt_init(void) {
    ESP_LOGI(TAG, "mqtt_init begin");

    esp_mqtt_client_config_t mqtt_cfg = {
//        .broker.address.uri = "mqtt://mqtt.eclipseprojects.io", // testing
        .broker.address.uri = "mqtt://192.168.1.83",
        .session.protocol_ver = MQTT_PROTOCOL_V_3_1_1,
    };

    esp_mqtt_client_handle_t mqtt_client = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_register_event(mqtt_client, MQTT_EVENT_ANY, 
            qfr_mqtt_ev_handler, NULL);
    // fill supplied skd
    esp_mqtt_client_register_event(mqtt_client, MQTT_EVENT_DATA,
            qfr_mqtt_ev_data_handler, NULL);
    ESP_ERROR_CHECK(esp_mqtt_client_start(mqtt_client));

    ESP_LOGI(TAG, "mqtt_init end");
}

