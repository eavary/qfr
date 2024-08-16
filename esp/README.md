
# esp32-c3-devkitc-02

* requires [idf.py](https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/index.html) to build
* `idf.py build flash monitor` to run

## schedule information

* `qfr_time_t` is the number of minutes since Sunday at midnight
* all arrays are of length `skd_length`

### c declaration

```c
typedef uint32_t qfr_time_t

typedef struct qfr_op_t {
    qfr_time_t start_time;
    uint32_t duration;
} qfr_op_t;

typedef struct qfr_skd_t {
    qfr_op_t* operations;
    uint32_t* zone_ids;
} qfr_skd_t;

uint32_t skd_length;
```

### example json

```json
{
    "operations": [
        {
            "start_time": 300,
            "duration": 15
        },
        {
            "start_time": 500,
            "duration": 30
        }
    ],
    "zone_ids": [0, 1],
    "length": 2
}
```
