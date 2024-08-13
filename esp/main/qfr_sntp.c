
#include <qfr_sntp.h>

#include <esp_err.h>
#include <esp_log.h>
#include <esp_netif_sntp.h>
#include <esp_sntp.h>

// LA timezone
#define QFR_TZ "PST8PDT,M3.2.0,M11.1.0"
// 12hr
#define QFR_SYNC_INTERVAL_MS 43200000

static const char* TAG = "qfr_sntp";

static void sntp_callback(struct timeval *tv) {
    ESP_LOGI(TAG, "time sync'd");
}

void qfr_sntp_init(void) {
    esp_sntp_config_t sntp_cfg = ESP_NETIF_SNTP_DEFAULT_CONFIG("us.pool.ntp.org");
    sntp_cfg.sync_cb = sntp_callback;
    esp_netif_sntp_init(&sntp_cfg);

    sntp_set_sync_interval(QFR_SYNC_INTERVAL_MS);

    while (esp_netif_sntp_sync_wait(2000/portTICK_PERIOD_MS) == ESP_ERR_TIMEOUT);

    setenv("TZ", QFR_TZ, 1);
    tzset();
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

