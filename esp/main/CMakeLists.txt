idf_component_register(SRCS "qfr.c" 
                            "qfr_wifi.c"
                    REQUIRES lwip esp_wifi nvs_flash qrcode wpa_supplicant
                    INCLUDE_DIRS ".")
