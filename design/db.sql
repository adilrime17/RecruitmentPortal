-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema stc
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `stc` ;

-- -----------------------------------------------------
-- Schema stc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stc` DEFAULT CHARACTER SET utf8 ;
USE `stc` ;

-- -----------------------------------------------------
-- Table `stc`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `full_name` VARCHAR(250) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_user_role_idx` (`role_id` ASC),
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `stc`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`scope`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`scope` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `description` VARCHAR(500) NULL,
  `data` VARCHAR(1000) NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`role_has_scope`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`role_has_scope` (
  `role_id` INT NOT NULL,
  `scope_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `scope_id`),
  INDEX `fk_role_has_scope_scope1_idx` (`scope_id` ASC),
  INDEX `fk_role_has_scope_role1_idx` (`role_id` ASC),
  CONSTRAINT `fk_role_has_scope_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `stc`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_role_has_scope_scope1`
    FOREIGN KEY (`scope_id`)
    REFERENCES `stc`.`scope` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`district`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`district` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `abbreviation` VARCHAR(250) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `province` VARCHAR(250) NOT NULL,
  `leniency` TINYINT(1) NOT NULL DEFAULT 0,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`location_class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`location_class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`qualification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`qualification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`candidate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate` (
  `cnic` VARCHAR(50) NOT NULL,
  `district_id` INT NOT NULL,
  `location_class_id` INT NOT NULL,
  `max_qualification_id` INT NOT NULL,
  `n_c_s_e` TINYINT(1) NOT NULL DEFAULT 0,
  `first_name` VARCHAR(250) NOT NULL,
  `middle_name` VARCHAR(250) NULL,
  `last_name` VARCHAR(250) NOT NULL,
  `father_name` VARCHAR(500) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `w_o_s` TINYINT(1) NOT NULL DEFAULT 0,
  `w_o_a` TINYINT(1) NOT NULL DEFAULT 0,
  `d_l_h` TINYINT(1) NOT NULL DEFAULT 0,
  `d_i_t` TINYINT(1) NOT NULL DEFAULT 0,
  `hafiz` TINYINT(1) NOT NULL DEFAULT 0,
  `contact_phone` VARCHAR(50) NULL,
  `guardian_phone` VARCHAR(50) NULL,
  `svas_xmatch` TINYINT(1) NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`cnic`),
  INDEX `fk_candidate_district1_idx` (`district_id` ASC),
  INDEX `fk_candidate_location_class1_idx` (`location_class_id` ASC),
  INDEX `fk_candidate_qualification1_idx` (`max_qualification_id` ASC),
  CONSTRAINT `fk_candidate_district1`
    FOREIGN KEY (`district_id`)
    REFERENCES `stc`.`district` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_location_class1`
    FOREIGN KEY (`location_class_id`)
    REFERENCES `stc`.`location_class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_qualification1`
    FOREIGN KEY (`max_qualification_id`)
    REFERENCES `stc`.`qualification` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `description` VARCHAR(500) NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`status` (
  `id` VARCHAR(250) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `category` VARCHAR(250) NULL,
  `is_reason_required` TINYINT(1) NOT NULL DEFAULT 0,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`candidate_has_course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate_has_course` (
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `course_id` INT NOT NULL,
  `status_id` VARCHAR(250) NOT NULL,
  `registration_number` VARCHAR(250) NOT NULL,
  `registered_date` TIMESTAMP NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`candidate_cnic`, `course_id`, `status_id`),
  INDEX `fk_candidate_has_course_course1_idx` (`course_id` ASC),
  INDEX `fk_candidate_has_course_candidate1_idx` (`candidate_cnic` ASC),
  INDEX `fk_candidate_has_course_status1_idx` (`status_id` ASC),
  UNIQUE INDEX `registration_number_UNIQUE` (`registration_number` ASC),
  CONSTRAINT `fk_candidate_has_course_candidate1`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_course_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_course_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `stc`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`user_has_course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`user_has_course` (
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `course_id`),
  INDEX `fk_user_has_course_course1_idx` (`course_id` ASC),
  INDEX `fk_user_has_course_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_course_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `stc`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_course_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`test`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`test` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`course_has_test`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`course_has_test` (
  `course_id` INT NOT NULL,
  `test_id` INT NOT NULL,
  `total_marks` FLOAT NOT NULL,
  `required_marks` FLOAT NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`course_id`, `test_id`),
  INDEX `fk_course_has_test_test1_idx` (`test_id` ASC),
  INDEX `fk_course_has_test_course1_idx` (`course_id` ASC),
  CONSTRAINT `fk_course_has_test_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_has_test_test1`
    FOREIGN KEY (`test_id`)
    REFERENCES `stc`.`test` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`candidate_test_score`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate_test_score` (
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `course_id` INT NOT NULL,
  `test_id` INT NOT NULL,
  `test_date` TIMESTAMP NOT NULL,
  `obtained_marks` FLOAT NULL,
  `final_status` VARCHAR(250) NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`candidate_cnic`, `course_id`, `test_id`),
  INDEX `fk_candidate_has_course_has_test_candidate1_idx` (`candidate_cnic` ASC),
  INDEX `fk_candidate_test_score_course1_idx` (`course_id` ASC),
  INDEX `fk_candidate_test_score_test1_idx` (`test_id` ASC),
  CONSTRAINT `fk_candidate_has_course_has_test_candidate1`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_test_score_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_test_score_test1`
    FOREIGN KEY (`test_id`)
    REFERENCES `stc`.`test` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`education_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`education_level` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `stc`.`education_degree`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`education_degree` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `education_level_id` INT NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_education_degree_education_level1_idx` (`education_level_id` ASC),
  CONSTRAINT `fk_education_degree_education_level1`
    FOREIGN KEY (`education_level_id`)
    REFERENCES `stc`.`education_level` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`education_major`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`education_major` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `education_level_id` INT NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_education_degree_education_level1_idx` (`education_level_id` ASC),
  CONSTRAINT `fk_education_degree_education_level10`
    FOREIGN KEY (`education_level_id`)
    REFERENCES `stc`.`education_level` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`education_subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`education_subject` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `education_major_id` INT NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_education_subject_education_major1_idx` (`education_major_id` ASC),
  CONSTRAINT `fk_education_subject_education_major1`
    FOREIGN KEY (`education_major_id`)
    REFERENCES `stc`.`education_major` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`candidate_has_education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate_has_education` (
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `education_level_id` INT NOT NULL,
  `education_degree_id` INT NULL,
  `education_major_id` INT NULL,
  `education_subject_id` INT NULL,
  `total_marks` FLOAT NOT NULL,
  `obtained_marks` FLOAT NOT NULL,
  `grade` VARCHAR(50) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`candidate_cnic`, `education_level_id`),
  INDEX `fk_candidate_has_education_level_education_level1_idx` (`education_level_id` ASC),
  INDEX `fk_candidate_has_education_level_candidate1_idx` (`candidate_cnic` ASC),
  INDEX `fk_candidate_has_education_education_degree1_idx` (`education_degree_id` ASC),
  INDEX `fk_candidate_has_education_education_major1_idx` (`education_major_id` ASC),
  INDEX `fk_candidate_has_education_education_subject1_idx` (`education_subject_id` ASC),
  CONSTRAINT `fk_candidate_has_education_level_candidate1`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_education_level_education_level1`
    FOREIGN KEY (`education_level_id`)
    REFERENCES `stc`.`education_level` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_education_education_degree1`
    FOREIGN KEY (`education_degree_id`)
    REFERENCES `stc`.`education_degree` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_education_education_major1`
    FOREIGN KEY (`education_major_id`)
    REFERENCES `stc`.`education_major` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_education_education_subject1`
    FOREIGN KEY (`education_subject_id`)
    REFERENCES `stc`.`education_subject` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`candidate_army_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate_army_info` (
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `army_number` VARCHAR(250) NULL,
  `unit` VARCHAR(250) NULL,
  `corps` VARCHAR(250) NULL,
  `d_o_d` TIMESTAMP NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`candidate_cnic`),
  CONSTRAINT `fk_default_candidate1`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`physical_test_score`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`physical_test_score` (
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `course_id` INT NOT NULL,
  `one_mile` VARCHAR(50) NOT NULL,
  `pull_up` VARCHAR(50) NOT NULL,
  `push_up` VARCHAR(50) NOT NULL,
  `crunches` VARCHAR(50) NOT NULL,
  `ditch` TINYINT(1) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  PRIMARY KEY (`candidate_cnic`, `course_id`),
  INDEX `fk_candidate_medical_info_course1_idx` (`course_id` ASC),
  CONSTRAINT `fk_candidate_medical_info_candidate1`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_medical_info_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`candidate_medical_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate_medical_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `course_id` INT NOT NULL,
  `height` FLOAT NOT NULL,
  `chest_in` FLOAT NOT NULL,
  `chest_out` FLOAT NOT NULL,
  `weight` FLOAT NOT NULL,
  `visible_deformity` TINYINT(1) NOT NULL,
  `temperature` FLOAT NULL,
  `pulse_rate` FLOAT NULL,
  `b_p_low` INT NULL,
  `b_p_high` INT NULL,
  `deformity_list` TEXT NULL,
  `status_update` VARCHAR(250) NULL,
  `remarks` VARCHAR(500) NULL,
  `comments_by_rmo` VARCHAR(500) NULL,
  `final_status` VARCHAR(250) NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_candidate_medical_info_candidate2_idx` (`candidate_cnic` ASC),
  INDEX `fk_candidate_medical_info_course2_idx` (`course_id` ASC),
  CONSTRAINT `fk_candidate_medical_info_candidate2`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_medical_info_course2`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`candidate_course_summary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate_course_summary` (
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `course_id` INT NOT NULL,
  `district_id` INT NOT NULL,
  `ward_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `sponsor` VARCHAR(500) NULL,
  PRIMARY KEY (`candidate_cnic`, `course_id`),
  INDEX `fk_candidate_has_course1_course1_idx` (`course_id` ASC),
  INDEX `fk_candidate_has_course1_candidate1_idx` (`candidate_cnic` ASC),
  INDEX `fk_candidate_course_summary_district1_idx` (`district_id` ASC),
  CONSTRAINT `fk_candidate_has_course1_candidate1`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_course1_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_course_summary_district1`
    FOREIGN KEY (`district_id`)
    REFERENCES `stc`.`district` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `stc`.`candidate_test_charge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stc`.`candidate_test_charge` (
  `candidate_cnic` VARCHAR(50) NOT NULL,
  `course_id` INT NOT NULL,
  `amount_to_pay` FLOAT NULL,
  `amount_paid` FLOAT NULL,
  `charges_paid` TINYINT(1) NOT NULL DEFAULT 0,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`candidate_cnic`, `course_id`),
  INDEX `fk_default_course1_idx` (`course_id` ASC),
  CONSTRAINT `fk_default_candidate2`
    FOREIGN KEY (`candidate_cnic`)
    REFERENCES `stc`.`candidate` (`cnic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_default_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `stc`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `stc`.`role`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`role` (`id`, `name`, `description`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 'admin', 'has rights to all stages', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`user` (`id`, `role_id`, `full_name`, `username`, `password`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 1, 'Super Admin', 'admin', 'test123', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`district`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (1, 'Atk', 'Attock', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (2, 'Bwp', 'Bahawalpur', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (3, 'Bwn', 'Bahawalnagar', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (4, 'Bkr', 'Bhakkar', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (5, 'Chn', 'Chiniot', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (6, 'Ckl', 'Chakwal', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (7, 'DGK', 'DG Khan', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (8, 'Fsd', 'Faisalabad', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (9, 'Gwa', 'Gujranwala', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (10, 'Gj1', 'Gujra1', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (11, 'H0z', 'Ha0izabad', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (12, 'Isd', 'Islamabad', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (13, 'Jng', 'Jhang', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (14, 'Jmr', 'Jhelum', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (15, 'Ksr', 'Kasur', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (16, 'Kwl', 'Khanewal', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (17, 'Ksb', 'Khushab', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (18, 'Lhr', 'Lahore', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (19, 'Lei', 'Leiah', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (20, 'Ldn', 'Lodhran', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (21, 'MBD', 'MB Din', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (22, 'Mwn', 'Mianwali', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (23, 'M1n', 'Mul1an', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (24, 'Mgh', 'Muza00argarh', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (25, 'Nks', 'Nankana Sahib', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (26, 'Nwl', 'Narowal', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (27, 'Oka', 'Okara', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (28, 'Pk1n', 'Pakpa11an', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (29, 'RYK', 'R Y Khan', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (30, 'Rnpr', 'Rajanpur', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (31, 'Rwp', 'Rawalpindi', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (32, 'Swl', 'Sahiwal', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (33, 'Sgd', 'Sargodha', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (34, 'Skpr', 'Sheikhupura', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (35, 'Slk', 'Sialko1', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (36, '11S', '11 Singh', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (37, 'Vhr', 'Vehari', 'Punjab', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (38, 'A1d', 'Abbo11abad', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (39, 'B/A', 'Bajour Agy', 'KPK', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (40, 'Bnu', 'Bannu', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (41, 'B1g', 'Ba1gram', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (42, 'Bnr', 'Buner', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (43, 'Cha', 'Charsadda', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (44, 'Ch1', 'Chi1ral', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (45, 'DIK', 'DI Khan', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (46, 'Dir(U)', 'Upper Dir', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (47, 'Dir (L)', 'Lower Dir', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (48, 'Hng', 'Hangu', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (49, 'Hpr', 'Haripur', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (50, 'Krk', 'Karak', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (51, 'K/A', 'Khyber Agy', 'KPK', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (52, 'Kh1', 'Koha1', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (53, 'Kh1n', 'Kohis1an', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (54, 'Ku/A', 'Kurram Agy', 'KPK', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (55, 'LM', 'Lakki Marwa1', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (56, 'Mkd', 'Malakand', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (57, 'Msr', 'Manshera', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (58, 'Mdn', 'Mardan', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (59, 'Mo/A', 'Mohmand Agy', 'KPK', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (60, 'Nsr', 'Nowshera', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (61, 'NWA', 'NW Agy', 'KPK', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (62, 'O/A', 'Orakzai Agy', 'KPK', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (63, 'Psc', 'Peshawar', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (64, 'Sw1', 'Sawa1', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (65, 'Shga', 'Shangla', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (66, 'SWA', 'SW Agency', 'KPK', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (67, 'Swb', 'Sawabi', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (68, '1nk', '1ank', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (69, '1gr', '1orghur', 'KPK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (70, 'Bdn', 'Badin', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (71, 'Dadu', 'Dadu', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (72, 'Ghk', 'Gho1ki', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (73, 'Hyd', 'Hyderabad', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (74, 'Jcb', 'Jacobabad', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (75, 'Jmsr', 'Jamshoro', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (78, 'Kci (E)', 'Karachi (E)', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (79, 'Kci (S)', 'Karachi (S)', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (80, 'Kci (W)', 'Karachi (W)', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (81, 'Kmr', 'Kashmore', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (82, 'Kpr', 'Khairpur', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (83, 'Lkr', 'Larkana', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (84, 'Mlr', 'Malir', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (85, 'M1ri', 'Ma1iari', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (86, 'MPK', 'Mirpur Khas', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (87, 'N0', 'Naushahro 0eroz', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (88, 'NS', 'Nawab Shah', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (89, 'Sgh', 'Sanghar', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (90, 'Shpr', 'Shikarpur', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (91, 'Skr', 'Sukkur', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (92, '1AY', '1ando Allah Yar', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (93, '1MK', '1ando M Khan', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (94, '1/MI', '1arparker/Mi1hi', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (95, '1ha', '1ha11a', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (96, 'Ukr', 'Umerko1', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (97, 'Bagh', 'Bagh', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (98, 'Bhm', 'Bhimber', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (99, 'H1n', 'Ha1ian', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (100, 'Hvi', 'Haveli', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (101, 'Ko1li', 'Ko1li', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (102, 'Mpr', 'Mirpur', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (76, 'Kmbr', 'Kamber (Shahdad Ko1)', 'Sindh', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (103, 'Mzd', 'Muza00arabad', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (104, 'Nlm', 'Neelum', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (105, 'Rwk', 'Rawalako1', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (106, 'Sudh', 'Sudhno1i', 'AK', 0, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (107, 'Awn', 'Awaran', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (108, 'Bkhn', 'Barkhan', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (109, 'Bln', 'Bolan', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (110, 'Chaghi', 'Chaghi', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (111, 'DB', 'Dera Bug1i', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (112, 'Gdr', 'Gawadar', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (113, 'J0d', 'Ja0arabad', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (114, 'JM', 'Jhal Magsi', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (115, 'Kl1', 'Kala1', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (116, '1b1', '1urba1 (Kech)', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (117, 'Krn', 'Kharan', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (118, 'Kzr', 'Khuzdar', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (119, 'Q/A', 'Qilla Abdullah', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (120, 'Q/S', 'Qilla Sai0ullah', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (121, 'Klu', 'Kohlu', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (122, 'Lba', 'Lasbela', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (123, 'LLI', 'Loralai', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (124, 'MK', 'Musa Khel', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (125, 'Ms1g', 'Mus1ang', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (126, 'Nsd', 'Nasirabad', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (127, 'Nski', 'Naushki', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (128, 'Pgr', 'Panjgur', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (129, 'Psn', 'Pishin', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (130, 'Q1a', 'Que11a', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (131, 'Sibi', 'Sibi', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (132, 'Zhb', 'Zhob', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (133, 'Zr1', 'Ziara1', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (134, 'Shni', 'Sherani', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (135, 'Hni', 'Harnai', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (136, 'Whk', 'Washuk', 'Balochis1an', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (137, 'As1r', 'As1ore', 'GB', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (138, 'Dmr', 'Diamer', 'GB', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (139, 'Gl1', 'Gilgi1', 'GB', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (140, 'Ghc', 'Ghanche', 'GB', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (141, 'Ghz', 'Ghizer', 'GB', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (142, 'Hngr ', 'Hunza Nagar', 'GB', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (143, 'Skd', 'Skardu', 'GB', 1, DEFAULT, NULL);
INSERT INTO `stc`.`district` (`id`, `abbreviation`, `name`, `province`, `leniency`, `create_time`, `update_time`) VALUES (77, 'Kci (C)', 'Karachi (C)', 'Sindh', 0, DEFAULT, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`location_class`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`location_class` (`id`, `name`, `create_time`, `update_time`) VALUES (1, 'Pb', DEFAULT, NULL);
INSERT INTO `stc`.`location_class` (`id`, `name`, `create_time`, `update_time`) VALUES (2, 'Ptn', DEFAULT, NULL);
INSERT INTO `stc`.`location_class` (`id`, `name`, `create_time`, `update_time`) VALUES (3, 'Sdh', DEFAULT, NULL);
INSERT INTO `stc`.`location_class` (`id`, `name`, `create_time`, `update_time`) VALUES (4, 'Blc', DEFAULT, NULL);
INSERT INTO `stc`.`location_class` (`id`, `name`, `create_time`, `update_time`) VALUES (5, 'K&GB', DEFAULT, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`qualification`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`qualification` (`id`, `name`, `create_time`, `update_time`) VALUES (1, 'U/ Matric', DEFAULT, NULL);
INSERT INTO `stc`.`qualification` (`id`, `name`, `create_time`, `update_time`) VALUES (2, 'Matric', DEFAULT, NULL);
INSERT INTO `stc`.`qualification` (`id`, `name`, `create_time`, `update_time`) VALUES (3, 'Inter', DEFAULT, NULL);
INSERT INTO `stc`.`qualification` (`id`, `name`, `create_time`, `update_time`) VALUES (4, 'Bachelor & Above', DEFAULT, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`course`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`course` (`id`, `name`, `description`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 'SP21', 'Spring 2021', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`status`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`status` (`id`, `name`, `category`, `is_reason_required`, `create_time`, `update_time`) VALUES ('eligible', 'Eligible', NULL, DEFAULT, DEFAULT, NULL);
INSERT INTO `stc`.`status` (`id`, `name`, `category`, `is_reason_required`, `create_time`, `update_time`) VALUES ('non-eligible', 'Non-Eligible', NULL, DEFAULT, DEFAULT, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`user_has_course`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`user_has_course` (`user_id`, `course_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`test`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 'Personality Test', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (2, 'Int Test', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (3, 'Written U/Matri', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (4, 'Written test', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (5, 'Tech test', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (6, 'Clk Test', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (7, 'Aptitude test', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (8, 'Computer Diploma', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (9, 'Hifz Test', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (10, 'PET', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`test` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (11, 'DLH Test', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`course_has_test`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 1, 120, 30, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 2, 50, 20, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 3, 50, 25, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 4, 100, 50, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 5, 100, 50, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 6, 100, 50, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 7, 20, 10, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 8, 50, 25, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 9, 1, 1, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 10, 25, 12, DEFAULT, NULL);
INSERT INTO `stc`.`course_has_test` (`course_id`, `test_id`, `total_marks`, `required_marks`, `create_time`, `update_time`) VALUES (1, 11, 1, 1, DEFAULT, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`education_level`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`education_level` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 'U/Matric', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_level` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (2, 'SSC', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_level` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (3, 'HSSC', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_level` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (4, 'Bachelor', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_level` (`id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (5, 'Master', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`education_degree`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 1, '5th', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (2, 1, '6th', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (3, 1, '7th', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (4, 1, '8th', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (5, 1, '9th', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (6, 2, '10th', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (7, 3, 'D.COM', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (8, 3, 'DAE', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (9, 3, 'FA', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (10, 3, 'FSc', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (11, 3, 'I.COM', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (12, 3, 'ICS', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (13, 4, 'B.COM', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (14, 4, 'BA', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (15, 4, 'BBA', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (16, 4, 'BCS', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (17, 4, 'BSc', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (18, 5, 'BS', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (19, 5, 'BSCS', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (20, 5, 'M.COM', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (21, 5, 'MA', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (22, 5, 'MBA', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_degree` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (23, 5, 'MSc', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`education_major`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 2, 'Science', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (2, 2, 'Arts', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (3, 3, 'Electronics', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (4, 3, 'Electrical', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (5, 3, 'IT', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (6, 3, 'Refrigerator', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (7, 3, 'Civ', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (8, 3, 'Mech', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (9, 3, 'PM', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_major` (`id`, `education_level_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (10, 3, 'PE', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stc`.`education_subject`
-- -----------------------------------------------------
START TRANSACTION;
USE `stc`;
INSERT INTO `stc`.`education_subject` (`id`, `education_major_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 1, 'CS', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_subject` (`id`, `education_major_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (2, 1, 'Tech', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_subject` (`id`, `education_major_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (3, 1, 'Bio', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_subject` (`id`, `education_major_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (4, 1, 'Pol', DEFAULT, NULL, DEFAULT);
INSERT INTO `stc`.`education_subject` (`id`, `education_major_id`, `name`, `create_time`, `update_time`, `is_deleted`) VALUES (5, 1, 'EW', DEFAULT, NULL, DEFAULT);

COMMIT;

