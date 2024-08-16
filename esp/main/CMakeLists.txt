idf_component_register(SRCS "qfr.c" 
                            "qfr_wifi.c"
                            "qfr_sntp.c"
                            "qfr_fat.c"
                    REQUIRES    lwip 
                                esp_wifi 
                                nvs_flash 
                                wpa_supplicant 
                                wifi_provisioning 
                                qrcode 
                                esp_netif 
                                wear_levelling
                                fatfs
                    INCLUDE_DIRS ".")
