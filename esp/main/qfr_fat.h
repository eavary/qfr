
#pragma once

#include <esp_vfs_fat.h>

#define QFR_BASE_PATH "/spiflash"
//const char* QFR_BASE_PATH = "/spiflash";

wl_handle_t qfr_fat_init(void);
void qfr_fat_deinit(wl_handle_t);

void qfr_fat_save_skd(char* csv, size_t csv_len);
void qfr_fat_load_skd(char* csv, size_t* csv_len);

