
#include <qfr_gpio.h>

#include <driver/gpio.h>
#include <esp_err.h>
#include <esp_log.h>

//#define QFR_LED_PIN GPIO_NUM_0
#define QFR_LED_PIN (1ULL << 0)

static const char* TAG = "qfr_gpio";

void qfr_gpio_init(void) {
    gpio_config_t gpio_cfg = {
        .pin_bit_mask = QFR_LED_PIN,
        .mode = GPIO_MODE_OUTPUT,
        .intr_type = GPIO_INTR_DISABLE,
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE
    };
    ESP_ERROR_CHECK(gpio_config(&gpio_cfg));
    ESP_LOGI(TAG, "gpio init");
}

void qfr_gpio_led_on(void) {
    ESP_ERROR_CHECK(gpio_set_level(GPIO_NUM_0, 0));
}

void qfr_gpio_led_off(void) {
    ESP_ERROR_CHECK(gpio_set_level(GPIO_NUM_0, 1));
}

