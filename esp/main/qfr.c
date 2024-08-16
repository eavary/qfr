
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

#include <stdio.h>
#include <string.h>

static const char* TAG = "qfr";
static wl_handle_t qfr_wl = WL_INVALID_HANDLE;

void app_main(void) {
    esp_err_t nvs_err = nvs_flash_init();
    if (nvs_err == ESP_ERR_NVS_NO_FREE_PAGES || nvs_err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ESP_ERROR_CHECK(nvs_flash_init());
    }

    qfr_gpio_init();
    qfr_gpio_led_off();

    qfr_wifi_init();

    qfr_sntp_init();
    qfr_sntp_print_time();

    qfr_wl = qfr_fat_init();

//    FILE *f = fopen("/spiflash/test", "wb");
//    fprintf(f, "hello, world");
//    fclose(f);
    
//    FILE *f = fopen("/spiflash/test", "rb");
//    char str[64];
//    fgets(str, sizeof (str), f);
//    fclose(f);
//    ESP_LOGW(TAG, "%s", str);

    // 190kB free heap at this point

    qfr_fat_deinit(qfr_wl);

    qfr_mqtt_init();

    ESP_LOGI(TAG, "wait");
    for (;;) {
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

