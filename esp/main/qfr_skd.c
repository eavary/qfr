
#include <qfr_skd.h>
#include <qfr_sntp.h>

#include <esp_err.h>
#include <esp_log.h>
#include <esp_timer.h>

#include <string.h>

#define MIN_TO_US(min) (uint64_t)(min*60000000)
#define DAY_US MIN_TO_US(24*60)

// time,duration,zone_id
void qfr_skd_from_csv(qfr_skd_t* skd, char* csv, size_t csv_len) {
    size_t num_lines = 0;
    for (size_t i = 0; i < csv_len; i++) if (csv[i] == '\n') num_lines++;

    skd->times = calloc(num_lines, sizeof (qfr_time_t));
    skd->durs = calloc(num_lines, sizeof (uint32_t));
    skd->ids = calloc(num_lines, sizeof (uint32_t));

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

void qfr_skd_reg_timers(qfr_skd_t skd) {
    //TODO
}

void qfr_skd_free(qfr_skd_t* skd) {
    free(skd->times);
    free(skd->durs);
    free(skd->ids);
}

