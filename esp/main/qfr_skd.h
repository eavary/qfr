
#pragma once

#include <stdint.h>
#include <stddef.h>

// minutes since sunday midnight
typedef uint32_t qfr_time_t;

// arrays are malloc'd
typedef struct qfr_skd_t {
    qfr_time_t* times;
    uint32_t* durs;
    uint32_t* ids;
    size_t len;
} qfr_skd_t;

typedef struct qfr_skd_cb_t {
    uint16_t on_min;
    uint16_t off_min;
} qfr_skd_cb_t;

void qfr_skd_from_csv(qfr_skd_t* skd, char* csv, size_t csv_len);

void qfr_skd_reg_timers(qfr_skd_t skd);

void qfr_skd_free(qfr_skd_t* skd);

