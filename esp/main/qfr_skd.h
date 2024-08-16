
#include <stdint.h>

typedef int32_t qfr_time_t;

//typedef struct {
//    int32_t zone_id;
//    qfr_time_t time;
//    int32_t duration;
//} qfr_block_t;

typedef struct qfr_skd_t {
    int32_t* zone_ids;
    qfr_time_t* times;
    int32_t* durations;
} qfr_skd_t;

typedef struct qfr_skd_cb_t {
} qfr_skd_cb_t;

