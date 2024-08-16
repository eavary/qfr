
#include <qfr_fat.h>

#include <esp_err.h>

#include <esp_vfs_fat.h>
#include <wear_levelling.h>

const char* TAG = "qfr_fat";
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

