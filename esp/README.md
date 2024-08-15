
# esp32-c3-devkitc-02

* requires [idf.py](https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/index.html) to build
* `idf.py build flash monitor` to run

## schedule information

* `qfr_time_t` is a 32 bit wide integer representing minutes past midnight
    * i.e. `300` represents 5:00 AM
* `qfr_block_t` is the structure representing a zone, the time at which it
    will run, and its duration
* `qfr_day` is a null-terminated string with form `$day`
    * where `$day` is the first three letters of a day of the week
    * i.e. `"mon\0"` is the key referring to the array of `qfr_block_t` denoting
        which sprinklers will be run on a Monday
* `blocks[]` is the array of `qfr_block_t` that will be transmitted to the
    microcontroller 

### c declaration

```c
typedef qfr_time_t int32_t;

typedef struct {
    int32_t zone_id;
    qfr_time_t time;
    int32_t duration;
} qfr_block_t;

struct schedule {
    char* qfr_time_op;
    qfr_block_t blocks[];
};
```

### example json

sprinkler 0 runs for 30 minutes on Monday beginning at 5AM.
sprinkler 1 runs for 10 minutes on Monday beginning at 6PM.
no sprinklers are run on Sunday.

```json
{
    "mon": [
        {0, 300, 30},
        {1, 1080, 10}
    ],
    ...
    "sun": [
    ]
}
```

