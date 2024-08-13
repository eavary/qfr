
#include <qfr_sntp.h>

#include <esp_err.h>
#include <esp_log.h>
#include <esp_netif_sntp.h>
#include <esp_sntp.h>

#define TZ_LA "PST8PDT,M3.2.0,M11.1.0"

static const char* TAG = "qfr_sntp";

void qfr_sntp_init(void) {
    esp_sntp_config_t sntp_cfg = ESP_NETIF_SNTP_DEFAULT_CONFIG("us.pool.ntp.org");
    esp_netif_sntp_init(&sntp_cfg);

    while (esp_netif_sntp_sync_wait(2000/portTICK_PERIOD_MS) == ESP_ERR_TIMEOUT);

    setenv("TZ", TZ_LA, 1);
    tzset();

    esp_netif_sntp_deinit();
}

void qfr_sntp_print_time(void) {
    time_t now = 0;
    struct tm timeinfo = {0};

    time(&now);
    localtime_r(&now, &timeinfo);

    char time_buf[64];
    strftime(time_buf, sizeof (time_buf), "%c", &timeinfo);
    ESP_LOGI(TAG, "the time is: %s", time_buf);
}

struct tm qfr_sntp_get_time(void) {
    time_t now = 0;
    struct tm timeinfo = {0};
    time(&now);
    localtime_r(&now, &timeinfo);
    return timeinfo;
}

