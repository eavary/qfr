
#include <qfr_wifi.h>

#include <esp_err.h>
#include <esp_log.h>
#include <nvs_flash.h>

#include <freertos/FreeRTOS.h>
#include <portmacro.h>

static const char* TAG = "qfr";

void app_main(void) {

    esp_err_t nvs_err = nvs_flash_init();
    if (nvs_err == ESP_ERR_NVS_NO_FREE_PAGES || nvs_err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ESP_ERROR_CHECK(nvs_flash_init());
    }

    // inits netif & default event loop
    qfr_wifi_init();

    for (;;) {
        ESP_LOGI(TAG, "hello, world");
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

