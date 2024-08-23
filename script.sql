-- Create the qfrdb database
CREATE DATABASE IF NOT EXISTS qfrdb;

-- Use the qfr database
USE qfrdb;

-- Create the tables
CREATE TABLE `qfrdb`.`devices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT "The name of the device",
  `ip_address` VARCHAR(45) COMMENT "The address of the device",
  `hostname` VARCHAR(255) COMMENT "The hostname of the device",
  `num_zones` INT NULL COMMENT "",
  PRIMARY KEY (`id`));
  
CREATE TABLE `qfrdb`.`zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `device_id` INT NOT NULL COMMENT "The device this zone belongs to",
  `name` VARCHAR(45) COMMENT "The name of the zone",
  PRIMARY KEY (`id`));
  
CREATE TABLE `qfrdb`.`schedules` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `zone_id` INT NOT NULL COMMENT "The zone for which this schedule applies",
  `day_of_week` ENUM ('Su','Mo','Tu','We','Th','Fr') COMMENT "The day of the week to execute operation",  
  `start_time` INT NOT NULL COMMENT "The time to start",
  `duration` INT NOT NULL COMMENT "How many minutes for operation",
  PRIMARY KEY (`id`));
