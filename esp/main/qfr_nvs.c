
#include <qfr_nvs.h>

#include <esp_err.h>
#include <esp_log.h>
#include <nvs.h>
#include <nvs_flash.h>

static const char* TAG = "qfr_nvs";
static const char* QFR_LABEL = "qfr";

nvs_handle_t qfr_nvs_init(void) {
    ESP_LOGI(TAG, "init %s partition", QFR_LABEL);
    ESP_ERROR_CHECK(nvs_flash_init_partition(QFR_LABEL));
    nvs_handle_t qfr_nvs = {0};
    ESP_LOGI(TAG, "open %s partition %s namespace", QFR_LABEL, QFR_LABEL);
    ESP_ERROR_CHECK(nvs_open_from_partition(QFR_LABEL, QFR_LABEL, 
                        NVS_READWRITE, &qfr_nvs));
    ESP_LOGI(TAG, "qfr nvs handle created!");
    return qfr_nvs;
}

