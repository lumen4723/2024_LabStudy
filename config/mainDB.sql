-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb`;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user`;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` VARCHAR(63) NOT NULL,
  `username` VARCHAR(127) NOT NULL,
  `pw` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`freeboard`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`freeboard`;

CREATE TABLE IF NOT EXISTS `mydb`.`freeboard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `created` DATETIME NOT NULL DEFAULT NOW(),
  `view` INT NOT NULL,
  `userid` VARCHAR(63) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_freeboard_user_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_freeboard_user`
    FOREIGN KEY (`userid`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`qnaboard`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`qnaboard`;

CREATE TABLE IF NOT EXISTS `mydb`.`qnaboard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `question` TEXT NOT NULL,
  `created` DATETIME NOT NULL DEFAULT NOW(),
  `view` INT NOT NULL,
  `userid` VARCHAR(63) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_qnaboard_user1_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_qnaboard_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`freecomment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`freecomment`;

CREATE TABLE IF NOT EXISTS `mydb`.`freecomment` (
  `id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `created` DATETIME NOT NULL DEFAULT NOW(),
  `boardid` INT NOT NULL,
  `userid` VARCHAR(63) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_freecomment_freeboard1_idx` (`boardid` ASC) VISIBLE,
  INDEX `fk_freecomment_user1_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_freecomment_freeboard1`
    FOREIGN KEY (`boardid`)
    REFERENCES `mydb`.`freeboard` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_freecomment_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`qnacomment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`qnacomment`;

CREATE TABLE IF NOT EXISTS `mydb`.`qnacomment` (
  `boardid` INT NOT NULL,
  `answer` TEXT NOT NULL,
  `created` DATETIME NOT NULL DEFAULT NOW(),
  `userid` VARCHAR(63) NOT NULL,
  PRIMARY KEY (`boardid`),
  INDEX `fk_qnacomment_user1_idx` (`userid` ASC) VISIBLE,
  INDEX `fk_qnacomment_qnaboard1_idx` (`boardid` ASC) VISIBLE,
  CONSTRAINT `fk_qnacomment_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_qnacomment_qnaboard1`
    FOREIGN KEY (`boardid`)
    REFERENCES `mydb`.`qnaboard` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
