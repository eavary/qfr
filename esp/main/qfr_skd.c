
#include <qfr_skd.h>

#include <esp_err.h>
#include <esp_log.h>
#include <esp_timer.h>

// using task dispatch

void qfr_skd_init(void) {
    ESP_ERROR_CHECK(esp_timer_init());

    // get schedule from fs, attempt sync
}


