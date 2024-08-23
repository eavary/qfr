#pragma once

#include <esp_event.h>

ESP_EVENT_DECLARE_BASE(QFR_EVENT);

enum {
    QFR_EVENT_RECV_SKD,
    QFR_EVENT_REG_TIMER,
};

