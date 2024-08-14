
# esp32-c3-devkitc-02

* requires [idf.py](https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/index.html) to build
* `idf.py build flash monitor` to run

## schedule information

* `qfr_time_t` is a 32 bit wide integer representing minutes past midnight
    * i.e. `300` represents 5:00 AM
* `qfr_block_t` is the structure representing a zone and the time at which it
    will have some operation done
* `qfr_time_op` is a null-terminated string with form `$day_$op`
    * where `$day` is the first three letters of a day of the week
    * where `$op` is either `on` or `off`
    * i.e. `"mon_on\0"` is the key referring to the array of `qfr_` denoting
        which sprinklers will be run on a Monday
* `blocks[]` is the array of `qfr_block_t` that will be transmitted to the
    microcontroller 
    * its first element will always contain a special instance
        of `qfr_block_t` whose `zone_id` field is the number of elements
        in `blocks` and whose `time` field is set to `-1`

### c declaration

```c
typedef qfr_time_t int32_t;

typedef struct {
    int zone_id;
    qfr_time_t time;
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
    "mon_on": [
        {2, -1},
        {0, 300},
        {1, 1080}
    ],
    "mon_off": [
        {2, -1},
        {0, 330},
        {1, 1090}
    ],
    ...
    "sun_on": [
        {0, -1}
    ],
    "sun_off": [
        {0, -1}
    ]
}
```

