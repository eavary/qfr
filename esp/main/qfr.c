
#include <qfr_event.h>
#include <qfr_fat.h>
#include <qfr_gpio.h>
#include <qfr_mqtt.h>
#include <qfr_skd.h>
#include <qfr_sntp.h>
#include <qfr_wifi.h>

#include <esp_err.h>
#include <esp_log.h>
#include <esp_sntp.h>

#include <nvs_flash.h>

#include <freertos/FreeRTOS.h>
#include <portmacro.h>

ESP_EVENT_DEFINE_BASE(QFR_EVENT);

static const char* TAG = "qfr";
static wl_handle_t qfr_wl = WL_INVALID_HANDLE;

static void qfr_recv_skd_handler(void* args, esp_event_base_t base,
                                 int32_t ev_id, void* ev_data) {
    // perhaps error-prone. verify
    size_t csv_len = *(size_t*)ev_data;
    char* csv = (char*)ev_data + sizeof (size_t);
    //
    qfr_fat_save_skd(csv, csv_len);
    qfr_skd_t skd = {0};
    qfr_skd_from_csv(&skd, csv, csv_len);
    qfr_skd_reg_timers(skd);
    qfr_skd_free(&skd);
}

void app_main(void) {
    esp_err_t nvs_err = nvs_flash_init();
    if (nvs_err == ESP_ERR_NVS_NO_FREE_PAGES || nvs_err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ESP_ERROR_CHECK(nvs_flash_init());
    }

    ESP_ERROR_CHECK(esp_event_loop_create_default());

    qfr_gpio_init();
    qfr_gpio_led_off();

    qfr_wifi_init();

    qfr_sntp_init();
    qfr_sntp_print_time();

    qfr_wl = qfr_fat_init();

    esp_event_handler_register(QFR_EVENT, QFR_EVENT_RECV_SKD, qfr_recv_skd_handler, NULL);

    size_t csv_len;
    qfr_fat_load_skd(NULL, &csv_len);
    if (csv_len != 0) {
        char* csv = calloc(csv_len, sizeof (char));
        qfr_fat_load_skd(csv, &csv_len);
        ESP_LOGI(TAG, "skd.csv: %zu\n%.*s", csv_len, csv_len, csv);
        qfr_skd_t skd = {0};
        qfr_skd_from_csv(&skd, csv, csv_len);
        qfr_skd_reg_timers(skd);
        qfr_skd_free(&skd);
    } else {
        ESP_LOGW(TAG, "skd.csv is empty. waiting for skd.csv from mqtt");
    }

//    FILE *f = fopen("/spiflash/test", "wb");
//    fprintf(f, "hello, world");
//    fclose(f);
    
//    FILE *f = fopen("/spiflash/test", "rb");
//    char str[64];
//    fgets(str, sizeof (str), f);
//    fclose(f);
//    ESP_LOGW(TAG, "%s", str);

    // 190kB free heap at this point

    qfr_mqtt_init();

    ESP_LOGI(TAG, "wait");
    for (;;) {
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }

    qfr_fat_deinit(qfr_wl);
}

