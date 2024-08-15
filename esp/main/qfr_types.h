
#include <stdint.h>

typedef int32_t qfr_time_t;

typedef struct {
    int32_t zone_id;
    qfr_time_t time;
    int32_t duration;
} qfr_block_t;

