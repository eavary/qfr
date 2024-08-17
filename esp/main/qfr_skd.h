
#pragma once

#include <stdint.h>

// minutes since sunday midnight
typedef uint32_t qfr_time_t;

typedef struct qfr_skd_op_t {
    qfr_time_t time;
    uint32_t duration;
} qfr_skd_op_t;


typedef struct qfr_skd_t {
    qfr_skd_op_t* operations;
    uint32_t* zone_ids;
} qfr_skd_t;

typedef struct qfr_skd_cb_t {
    uint16_t on_min;
    uint16_t off_min;
} qfr_skd_cb_t;

