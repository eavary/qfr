idf_component_register(SRCS "qfr.c" 
                            "qfr_wifi.c"
                    REQUIRES lwip esp_wifi nvs_flash wpa_supplicant wifi_provisioning
                    INCLUDE_DIRS ".")
