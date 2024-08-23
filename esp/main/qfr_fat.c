
#include <qfr_fat.h>

#include <esp_err.h>

#include <esp_vfs_fat.h>
#include <wear_levelling.h>

static const char* TAG = "qfr_fat";
const char* QFR_LABEL = "qfr";

wl_handle_t qfr_fat_init(void) {
    const esp_vfs_fat_mount_config_t fat_mount_cfg = {
        .max_files = 4,
        .format_if_mount_failed = true,
        .allocation_unit_size = CONFIG_WL_SECTOR_SIZE,
        .use_one_fat = false,
    };
    wl_handle_t qfr_wl = WL_INVALID_HANDLE;
    ESP_ERROR_CHECK(esp_vfs_fat_spiflash_mount_rw_wl(QFR_BASE_PATH, QFR_LABEL,
                        &fat_mount_cfg, &qfr_wl));
    return qfr_wl;
}

void qfr_fat_deinit(wl_handle_t qfr_wl) {
    ESP_ERROR_CHECK(esp_vfs_fat_spiflash_unmount_rw_wl(QFR_BASE_PATH, qfr_wl));
}

#define QFR_SKD_PATH "/spiflash/skd.csv"

void qfr_fat_save_skd(char* csv, size_t csv_len) {
    FILE* skd_file = fopen(QFR_SKD_PATH, "w");
    size_t bytes_written = fwrite(csv, sizeof (char), csv_len, skd_file);
    fclose(skd_file);
    if (bytes_written < csv_len)
        ESP_LOGE(TAG, "error storing skd csv (%u/%u)", bytes_written, csv_len);
}

// two pass
void qfr_fat_load_skd(char* csv, size_t* csv_len) {
    FILE* skd_file = fopen(QFR_SKD_PATH, "rb");
    if (csv) {
        fread(csv, sizeof (char), *csv_len, skd_file);
    } else {
        fseek(skd_file, 0, SEEK_END);
        *csv_len = ftell(skd_file);
    }
    fclose(skd_file);
}

