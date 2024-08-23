
# esp32-c3-devkitc-02

* requires [idf.py](https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/index.html) to build
* `idf.py build flash monitor` to run

## schedule information

* `qfr_time_t` is the number of minutes since Sunday at midnight
* durations `durs` are in minutes
* `ids` correspond to zone ids, distinguishing sprinkler "zones" (solenoids)
* all arrays have same length
* transmitted as csv via mqtt

### c declaration

```c
typedef uint32_t qfr_time_t

typedef struct qfr_skd_t {
    qfr_time_t* times;
    uint32_t* durs;
    uint32_t* ids;
} qfr_skd_t;
```

### example csv

```csv
times,durs,ids
300,30,0
600,60,2
```
* sprinkler 0 runs Sunday at 5AM for 30 minutes
* sprinkler 2 runs Sunday at 10AM for 60 minutes

