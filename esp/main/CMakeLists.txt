idf_component_register(SRCS "qfr.c" 
                            "qfr_wifi.c"
                            "qfr_sntp.c"
                            "qfr_fat.c"
                            "qfr_skd.c"
                            "qfr_mqtt.c"
                    REQUIRES    lwip 
                                esp_wifi 
                                nvs_flash 
                                wifi_provisioning 
                                qrcode 
                                esp_netif 
                                wear_levelling
                                fatfs
                                esp_timer
                                mqtt
                                esp_driver_gpio
                    INCLUDE_DIRS ".")
