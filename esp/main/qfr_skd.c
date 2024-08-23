
#include <qfr_skd.h>

#include <qfr_gpio.h>
#include <qfr_sntp.h>

#include <esp_err.h>
#include <esp_log.h>
#include <esp_timer.h>

#include <string.h>

#define QFR_MIN_TO_US(min) (uint64_t)((min)*60000000)
#define QFR_WEEK_US (uint64_t)(604800000000)

static const char* TAG = "qfr_skd";

// time,duration,zone_id
void qfr_skd_from_csv(qfr_skd_t* skd, char* csv, size_t csv_len) {
    size_t num_lines = 0;
    for (size_t i = 0; i < csv_len; i++) if (csv[i] == '\n') num_lines++;

    skd->times = calloc(num_lines, sizeof (qfr_time_t));
    skd->durs = calloc(num_lines, sizeof (uint32_t));
    skd->ids = calloc(num_lines, sizeof (uint32_t));
    skd->len = num_lines;

    char* tok = strtok(csv, ",\n");
    size_t num_tok = 0;
    size_t idx;
    while (tok) {
        idx = num_tok/3;
        switch (num_tok%3) {
        case 0:
            skd->times[idx] = atoi(tok);
            break;
        case 1:
            skd->durs[idx] = atoi(tok);
            break;
        case 2:
            skd->ids[idx] = atoi(tok);
            break;
        }
        num_tok++;
        tok = strtok(NULL, ",\n");
    }
}

qfr_time_t qfr_skd_get_time(void) {
    struct tm tm_now = qfr_sntp_get_time();
    qfr_time_t now = 0;
    now = tm_now.tm_wday*24*60;
    now += tm_now.tm_hour*60;
    now += tm_now.tm_min;
    return now;
}

typedef struct qfr_skd_cb_args_t {
    bool is_on;
    size_t idx;
    uint32_t id;
    esp_timer_handle_t* timers;
} qfr_skd_cb_args_t;

void qfr_skd_periodic_cb(void* args) {
    qfr_skd_cb_args_t skd_args = *(qfr_skd_cb_args_t*) args;
    // pending actual solenoid controls
    ESP_LOGI(TAG, "periodic: op: %d, id: %u", skd_args.is_on, skd_args.id);
    if (skd_args.is_on)
        qfr_gpio_led_on();
    else
        qfr_gpio_led_off();
}

void qfr_skd_oneshot_cb(void* args) {
    qfr_skd_cb_args_t skd_args = *(qfr_skd_cb_args_t*) args;
    esp_timer_handle_t timer;
    esp_timer_create_args_t cfg = {0};
    cfg.callback = qfr_skd_periodic_cb;
    cfg.arg = args;
    esp_timer_create(&cfg, &timer);
    esp_timer_start_periodic(timer, QFR_WEEK_US);
    skd_args.timers[skd_args.idx] = timer;
    // pending actual solenoid controls
    ESP_LOGI(TAG, "oneshot: op: %d, id: %u", skd_args.is_on, skd_args.id);
    if (skd_args.is_on)
        qfr_gpio_led_on();
    else
        qfr_gpio_led_off();
}

// even timers turn on, odd timers turn off
// don't care about zone ids for now
void qfr_skd_reg_timers(qfr_skd_t skd, esp_timer_handle_t* timers) {
    timers = calloc(skd.len*2, sizeof (esp_timer_handle_t));
    esp_timer_create_args_t cfg = {0};
    cfg.callback = qfr_skd_oneshot_cb;
    qfr_time_t now = qfr_skd_get_time();
    for (size_t i = 0; i < skd.len*2; i+=2) {
        // make on and off timers
        qfr_skd_cb_args_t on_args = {
            .timers = timers,
            .idx = i,
            .is_on = true,
            .id = skd.ids[i],
        };
        esp_timer_handle_t on_timer;
        cfg.arg = (void*)&on_args;
        esp_timer_create(&cfg, &on_timer);
        timers[i] = on_timer;
        qfr_skd_cb_args_t off_args = {
            .timers = timers,
            .idx = i+1,
            .is_on = false,
            .id = skd.ids[i],
        };
        esp_timer_handle_t off_timer;
        cfg.arg = (void*)&off_args;
        esp_timer_create(&cfg, &off_timer);
        timers[i+1] = off_timer;
        // calculate times from skd
        qfr_time_t set = now > skd.times[i] ? now - skd.times[i] : skd.times[i] - now;
        esp_timer_start_once(on_timer, QFR_MIN_TO_US(set));
        esp_timer_start_once(off_timer, QFR_MIN_TO_US(set+skd.durs[i]));
    }
}

void qfr_skd_free(qfr_skd_t* skd) {
    free(skd->times);
    free(skd->durs);
    free(skd->ids);
}

