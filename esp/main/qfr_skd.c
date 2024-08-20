
#include <qfr_skd.h>
#include <qfr_sntp.h>

#include <esp_err.h>
#include <esp_log.h>
#include <esp_timer.h>

#define MIN_TO_US(min) (uint64_t)(min*60000000)
#define DAY_US MIN_TO_US(24*60)

// using task dispatch


void qfr_skd_daily_on_cb(void) {
}

void qfr_skd_daily_off_cb(void) {
}

// expects `timers` on stack of size `sz`
static void get_time(qfr_skd_op_t* ops, size_t sz, qfr_skd_cb_t* times) {
}

void qfr_skd_oneshot_on_cb(void) {
    // register qfr_skd_daily_cb
}

void qfr_skd_oneshot_off_cb(void) {
}

void qfr_skd_init(void) {
    // get schedule from fs, attempt sync
}

