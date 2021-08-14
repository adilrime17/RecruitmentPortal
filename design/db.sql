-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: stc
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate` (
  `cnic` varchar(50) NOT NULL,
  `district_id` int NOT NULL,
  `location_class_id` int NOT NULL,
  `max_qualification_id` int NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `middle_name` varchar(250) DEFAULT NULL,
  `last_name` varchar(250) NOT NULL,
  `father_name` varchar(500) NOT NULL,
  `date_of_birth` date NOT NULL,
  `w_o_s` tinyint(1) NOT NULL,
  `w_o_a` tinyint(1) NOT NULL,
  `d_l_h` tinyint(1) NOT NULL,
  `height` float NOT NULL,
  `chest` float NOT NULL,
  `weight` float NOT NULL,
  `visible_deformity` tinyint(1) NOT NULL,
  `eligibility` tinyint NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cnic`),
  KEY `fk_candidate_district1_idx` (`district_id`),
  KEY `fk_candidate_location_class1_idx` (`location_class_id`),
  KEY `fk_candidate_qualification1_idx` (`max_qualification_id`),
  CONSTRAINT `fk_candidate_district1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`),
  CONSTRAINT `fk_candidate_location_class1` FOREIGN KEY (`location_class_id`) REFERENCES `location_class` (`id`),
  CONSTRAINT `fk_candidate_qualification1` FOREIGN KEY (`max_qualification_id`) REFERENCES `qualification` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES ('13302-4412039-1',49,1,4,'Muzaffar',NULL,'Hussain','Manzoor Hussain','1993-06-06',0,0,1,25,72.75,68,0,0,'2021-08-13 02:40:32',NULL);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_has_course`
--

DROP TABLE IF EXISTS `candidate_has_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_has_course` (
  `candidate_cnic` varchar(50) NOT NULL,
  `course_id` int NOT NULL,
  `status_id` varchar(250) NOT NULL,
  PRIMARY KEY (`candidate_cnic`,`course_id`,`status_id`),
  KEY `fk_candidate_has_course_course1_idx` (`course_id`),
  KEY `fk_candidate_has_course_candidate1_idx` (`candidate_cnic`),
  KEY `fk_candidate_has_course_status1_idx` (`status_id`),
  CONSTRAINT `fk_candidate_has_course_candidate1` FOREIGN KEY (`candidate_cnic`) REFERENCES `candidate` (`cnic`),
  CONSTRAINT `fk_candidate_has_course_course1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `fk_candidate_has_course_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_has_course`
--

LOCK TABLES `candidate_has_course` WRITE;
/*!40000 ALTER TABLE `candidate_has_course` DISABLE KEYS */;
INSERT INTO `candidate_has_course` VALUES ('13302-4412039-1',1,'non-eligible');
/*!40000 ALTER TABLE `candidate_has_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'SP21','Spring 2021','2021-08-05 10:17:54',NULL,0);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `district` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `province` varchar(250) NOT NULL,
  `abbreviation` varchar(250) NOT NULL,
  `class` int NOT NULL,
  `leniency` tinyint(1) NOT NULL DEFAULT '0',
  `update_time` timestamp NULL DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (1,'Attock','Punjab','Atk',1,0,NULL,'2021-08-05 10:17:51'),(2,'Bahawalpur','Punjab','Bwp',1,0,NULL,'2021-08-05 10:17:51'),(3,'Bahawalnagar','Punjab','Bwn',1,0,NULL,'2021-08-05 10:17:51'),(4,'Bhakkar','Punjab','Bkr',1,0,NULL,'2021-08-05 10:17:51'),(5,'Chiniot','Punjab','Chn',1,0,NULL,'2021-08-05 10:17:51'),(6,'Chakwal','Punjab','Ckl',1,0,NULL,'2021-08-05 10:17:51'),(7,'DG Khan','Punjab','DGK',1,0,NULL,'2021-08-05 10:17:51'),(8,'Faisalabad','Punjab','Fsd',1,0,NULL,'2021-08-05 10:17:51'),(9,'Gujranwala','Punjab','Gwa',1,0,NULL,'2021-08-05 10:17:51'),(10,'Gujrat','Punjab','Gjt',1,0,NULL,'2021-08-05 10:17:51'),(11,'Hafizabad','Punjab','Hfz',1,0,NULL,'2021-08-05 10:17:51'),(12,'Islamabad','Punjab','Isd',1,0,NULL,'2021-08-05 10:17:51'),(13,'Jhang','Punjab','Jng',1,0,NULL,'2021-08-05 10:17:51'),(14,'Jhelum','Punjab','Jmr',1,0,NULL,'2021-08-05 10:17:52'),(15,'Kasur','Punjab','Ksr',1,0,NULL,'2021-08-05 10:17:52'),(16,'Khanewal','Punjab','Kwl',1,0,NULL,'2021-08-05 10:17:52'),(17,'Khushab','Punjab','Ksb',1,0,NULL,'2021-08-05 10:17:52'),(18,'Lahore','Punjab','Lhr',1,0,NULL,'2021-08-05 10:17:52'),(19,'Leiah','Punjab','Lei',1,0,NULL,'2021-08-05 10:17:52'),(20,'Lodhran','Punjab','Ldn',1,0,NULL,'2021-08-05 10:17:52'),(21,'MB Din','Punjab','MBD',1,0,NULL,'2021-08-05 10:17:52'),(22,'Mianwali','Punjab','Mwn',1,0,NULL,'2021-08-05 10:17:52'),(23,'Multan','Punjab','Mtn',1,0,NULL,'2021-08-05 10:17:52'),(24,'Muzaffargarh','Punjab','Mgh',1,0,NULL,'2021-08-05 10:17:52'),(25,'Nankana Sahib','Punjab','Nks',1,0,NULL,'2021-08-05 10:17:52'),(26,'Narowal','Punjab','Nwl',1,0,NULL,'2021-08-05 10:17:52'),(27,'Okara','Punjab','Oka',1,0,NULL,'2021-08-05 10:17:52'),(28,'Pakpattan','Punjab','Pktn',1,0,NULL,'2021-08-05 10:17:52'),(29,'R Y Khan','Punjab','RYK',1,0,NULL,'2021-08-05 10:17:52'),(30,'Rajanpur','Punjab','Rnpr',1,0,NULL,'2021-08-05 10:17:52'),(31,'Rawalpindi','Punjab','Rwp',1,0,NULL,'2021-08-05 10:17:52'),(32,'Sahiwal','Punjab','Swl',1,0,NULL,'2021-08-05 10:17:52'),(33,'Sargodha','Punjab','Sgd',1,0,NULL,'2021-08-05 10:17:52'),(34,'Sheikhupura','Punjab','Skpr',1,0,NULL,'2021-08-05 10:17:52'),(35,'Sialkot','Punjab','Slk',1,0,NULL,'2021-08-05 10:17:52'),(36,'TT Singh','Punjab','TtS',1,0,NULL,'2021-08-05 10:17:52'),(37,'Vehari','Punjab','Vhr',1,0,NULL,'2021-08-05 10:17:52'),(38,'Abbottabad','KPK','Atd',2,0,NULL,'2021-08-05 10:17:52'),(39,'Bajour TD','KPK','B/A',2,1,NULL,'2021-08-05 10:17:52'),(40,'Bannu','KPK','Bnu',2,0,NULL,'2021-08-05 10:17:52'),(41,'Batgram','KPK','Btg',2,0,NULL,'2021-08-05 10:17:52'),(42,'Buner','KPK','Bnr',2,0,NULL,'2021-08-05 10:17:52'),(43,'Charsadda','KPK','Cha',2,0,NULL,'2021-08-05 10:17:52'),(44,'Chitral','KPK','Cht',2,0,NULL,'2021-08-05 10:17:52'),(45,'DI Khan','KPK','DIK',2,0,NULL,'2021-08-05 10:17:52'),(46,'Upper Dir','KPK','Dir(U)',2,0,NULL,'2021-08-05 10:17:52'),(47,'Lower Dir','KPK','Dir (L)',2,0,NULL,'2021-08-05 10:17:52'),(48,'Hangu','KPK','Hng',2,0,NULL,'2021-08-05 10:17:52'),(49,'Haripur','KPK','Hpr',2,0,NULL,'2021-08-05 10:17:52'),(50,'Karak','KPK','Krk',2,0,NULL,'2021-08-05 10:17:52'),(51,'Khyber TD','KPK','K/A',2,1,NULL,'2021-08-05 10:17:52'),(52,'Kohat','KPK','Kh1',2,0,NULL,'2021-08-05 10:17:52'),(53,'Kohistan','KPK','Kh1n',2,0,NULL,'2021-08-05 10:17:52'),(54,'Kurram TD','KPK','Ku/A',2,1,NULL,'2021-08-05 10:17:52'),(55,'Lakki Marwat','KPK','LM',2,0,NULL,'2021-08-05 10:17:53'),(56,'Malakand','KPK','Mkd',2,0,NULL,'2021-08-05 10:17:53'),(57,'Manshera','KPK','Msr',2,0,NULL,'2021-08-05 10:17:53'),(58,'Mardan','KPK','Mdn',2,0,NULL,'2021-08-05 10:17:53'),(59,'Mohmand TD','KPK','Mo/A',2,1,NULL,'2021-08-05 10:17:53'),(60,'Nowshera','KPK','Nsr',2,0,NULL,'2021-08-05 10:17:53'),(61,'NW TD','KPK','NWA',2,1,NULL,'2021-08-05 10:17:53'),(62,'Orakzai TD','KPK','O/A',2,1,NULL,'2021-08-05 10:17:53'),(63,'Peshawar','KPK','Psc',2,0,NULL,'2021-08-05 10:17:53'),(64,'Sawat','KPK','Swt',2,0,NULL,'2021-08-05 10:17:53'),(65,'Shangla','KPK','Shga',2,0,NULL,'2021-08-05 10:17:53'),(66,'SW TD','KPK','SWA',2,1,NULL,'2021-08-05 10:17:53'),(67,'Sawabi','KPK','Swb',2,0,NULL,'2021-08-05 10:17:53'),(68,'Tank','KPK','Tnk',2,0,NULL,'2021-08-05 10:17:53'),(69,'Torghur','KPK','Tgr',2,0,NULL,'2021-08-05 10:17:53'),(70,'Badin','Sindh','Bdn',3,0,NULL,'2021-08-05 10:17:53'),(71,'Dadu','Sindh','Dadu',3,0,NULL,'2021-08-05 10:17:53'),(72,'Ghotki','Sindh','Ghk',3,0,NULL,'2021-08-05 10:17:53'),(73,'Hyderabad','Sindh','Hyd',3,0,NULL,'2021-08-05 10:17:53'),(74,'Jacobabad','Sindh','Jcb',3,0,NULL,'2021-08-05 10:17:53'),(75,'Jamshoro','Sindh','Jmsr',3,0,NULL,'2021-08-05 10:17:53'),(76,'Kamber (Shahdad Ko1)','Sindh','Kmbr',3,0,NULL,'2021-08-05 10:17:53'),(77,'Karachi (C)','Sindh','Kci (C)',3,0,NULL,'2021-08-05 10:17:54'),(78,'Karachi (E)','Sindh','Kci (E)',3,0,NULL,'2021-08-05 10:17:53'),(79,'Karachi (S)','Sindh','Kci (S)',3,0,NULL,'2021-08-05 10:17:53'),(80,'Karachi (W)','Sindh','Kci (W)',3,0,NULL,'2021-08-05 10:17:53'),(81,'Kashmore','Sindh','Kmr',3,0,NULL,'2021-08-05 10:17:53'),(82,'Khairpur','Sindh','Kpr',3,0,NULL,'2021-08-05 10:17:53'),(83,'Larkana','Sindh','Lkr',3,0,NULL,'2021-08-05 10:17:53'),(84,'Malir','Sindh','Mlr',3,0,NULL,'2021-08-05 10:17:53'),(85,'Matiari','Sindh','Mtri',3,0,NULL,'2021-08-05 10:17:53'),(86,'Mirpur Khas','Sindh','MPK',3,0,NULL,'2021-08-05 10:17:53'),(87,'Naushahro 0eroz','Sindh','N0',3,0,NULL,'2021-08-05 10:17:53'),(88,'Nawab Shah','Sindh','NS',3,0,NULL,'2021-08-05 10:17:53'),(89,'Sanghar','Sindh','Sgh',3,0,NULL,'2021-08-05 10:17:53'),(90,'Shikarpur','Sindh','Shpr',3,0,NULL,'2021-08-05 10:17:53'),(91,'Sukkur','Sindh','Skr',3,0,NULL,'2021-08-05 10:17:53'),(92,'Tando Allah Yar','Sindh','TAY',3,0,NULL,'2021-08-05 10:17:53'),(93,'Tando M Khan','Sindh','TMK',3,0,NULL,'2021-08-05 10:17:53'),(94,'Tarparker/Mithi','Sindh','T/MI',3,0,NULL,'2021-08-05 10:17:53'),(95,'Thatta','Sindh','Tha',3,0,NULL,'2021-08-05 10:17:53'),(96,'Umerkot','Sindh','Ukr',3,0,NULL,'2021-08-05 10:17:53'),(97,'Bagh','AK','Bagh',5,0,NULL,'2021-08-05 10:17:53'),(98,'Bhimber','AK','Bhm',5,0,NULL,'2021-08-05 10:17:53'),(99,'Hatian','AK','Htn',5,0,NULL,'2021-08-05 10:17:53'),(100,'Haveli','AK','Hvi',5,0,NULL,'2021-08-05 10:17:53'),(101,'Kotli','AK','Kotli',5,0,NULL,'2021-08-05 10:17:53'),(102,'Mirpur','AK','Mpr',5,0,NULL,'2021-08-05 10:17:53'),(103,'Muzaffarabad','AK','Mzd',5,0,NULL,'2021-08-05 10:17:53'),(104,'Neelum','AK','Nlm',5,0,NULL,'2021-08-05 10:17:53'),(105,'Rawalakot','AK','Rwk',5,0,NULL,'2021-08-05 10:17:53'),(106,'Sudhnoti','AK','Sudh',5,0,NULL,'2021-08-05 10:17:53'),(107,'Awaran','Balochis1an','Awn',4,1,NULL,'2021-08-05 10:17:53'),(108,'Barkhan','Balochis1an','Bkhn',4,1,NULL,'2021-08-05 10:17:53'),(109,'Bolan','Balochis1an','Bln',4,1,NULL,'2021-08-05 10:17:53'),(110,'Chaghi','Balochis1an','Chaghi',4,1,NULL,'2021-08-05 10:17:54'),(111,'Dera Bugti','Balochis1an','DB',4,1,NULL,'2021-08-05 10:17:54'),(112,'Gawadar','Balochis1an','Gdr',4,1,NULL,'2021-08-05 10:17:54'),(113,'Jaffarabad','Balochis1an','Jfd',4,1,NULL,'2021-08-05 10:17:54'),(114,'Jhal Magsi','Balochis1an','JM',4,1,NULL,'2021-08-05 10:17:54'),(115,'Kalat','Balochis1an','Klt',4,1,NULL,'2021-08-05 10:17:54'),(116,'Turbat (Kech)','Balochis1an','Tbt',4,1,NULL,'2021-08-05 10:17:54'),(117,'Kharan','Balochis1an','Krn',4,1,NULL,'2021-08-05 10:17:54'),(118,'Khuzdar','Balochis1an','Kzr',4,1,NULL,'2021-08-05 10:17:54'),(119,'Qilla Abdullah','Balochis1an','Q/A',4,1,NULL,'2021-08-05 10:17:54'),(120,'Qilla Sai0ullah','Balochis1an','Q/S',4,1,NULL,'2021-08-05 10:17:54'),(121,'Kohlu','Balochis1an','Klu',4,1,NULL,'2021-08-05 10:17:54'),(122,'Lasbela','Balochis1an','Lba',4,1,NULL,'2021-08-05 10:17:54'),(123,'Loralai','Balochis1an','LLI',4,1,NULL,'2021-08-05 10:17:54'),(124,'Musa Khel','Balochis1an','MK',4,1,NULL,'2021-08-05 10:17:54'),(125,'Mustang','Balochis1an','Mstg',4,1,NULL,'2021-08-05 10:17:54'),(126,'Nasirabad','Balochis1an','Nsd',4,1,NULL,'2021-08-05 10:17:54'),(127,'Naushki','Balochis1an','Nski',4,1,NULL,'2021-08-05 10:17:54'),(128,'Panjgur','Balochis1an','Pgr',4,1,NULL,'2021-08-05 10:17:54'),(129,'Pishin','Balochis1an','Psn',4,1,NULL,'2021-08-05 10:17:54'),(130,'Quetta','Balochis1an','Qta',4,1,NULL,'2021-08-05 10:17:54'),(131,'Sibi','Balochis1an','Sibi',4,1,NULL,'2021-08-05 10:17:54'),(132,'Zhob','Balochis1an','Zhb',4,1,NULL,'2021-08-05 10:17:54'),(133,'Ziarat','Balochis1an','Zrt',4,1,NULL,'2021-08-05 10:17:54'),(134,'Sherani','Balochis1an','Shni',4,1,NULL,'2021-08-05 10:17:54'),(135,'Harnai','Balochis1an','Hni',4,1,NULL,'2021-08-05 10:17:54'),(136,'Washuk','Balochis1an','Whk',4,1,NULL,'2021-08-05 10:17:54'),(137,'Astore','GB','Astr',5,1,NULL,'2021-08-05 10:17:54'),(138,'Diamer','GB','Dmr',5,1,NULL,'2021-08-05 10:17:54'),(139,'Gilgit','GB','Glt',5,1,NULL,'2021-08-05 10:17:54'),(140,'Ghanche','GB','Ghc',5,1,NULL,'2021-08-05 10:17:54'),(141,'Ghizer','GB','Ghz',5,1,NULL,'2021-08-05 10:17:54'),(142,'Hunza Nagar','GB','Hngr ',5,1,NULL,'2021-08-05 10:17:54'),(143,'Skardu','GB','Skd',5,1,NULL,'2021-08-05 10:17:54');
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_class`
--

DROP TABLE IF EXISTS `location_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_class`
--

LOCK TABLES `location_class` WRITE;
/*!40000 ALTER TABLE `location_class` DISABLE KEYS */;
INSERT INTO `location_class` VALUES (1,'Pb','2021-08-05 10:17:54',NULL),(2,'Ptn','2021-08-05 10:17:54',NULL),(3,'Sdh','2021-08-05 10:17:54',NULL),(4,'Blc','2021-08-05 10:17:54',NULL),(5,'K&GB','2021-08-05 10:17:54',NULL);
/*!40000 ALTER TABLE `location_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qualification`
--

LOCK TABLES `qualification` WRITE;
/*!40000 ALTER TABLE `qualification` DISABLE KEYS */;
INSERT INTO `qualification` VALUES (1,'U/ Matric','2021-08-05 10:17:54',NULL),(2,'Matric','2021-08-05 10:17:54',NULL),(3,'Inter','2021-08-05 10:17:54',NULL),(4,'Bachelor & Above','2021-08-05 10:17:54',NULL);
/*!40000 ALTER TABLE `qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` varchar(500) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','has rights to all stages','2021-08-05 10:17:51',NULL,0);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_scope`
--

DROP TABLE IF EXISTS `role_has_scope`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_scope` (
  `role_id` int NOT NULL,
  `scope_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`scope_id`),
  KEY `fk_role_has_scope_scope1_idx` (`scope_id`),
  KEY `fk_role_has_scope_role1_idx` (`role_id`),
  CONSTRAINT `fk_role_has_scope_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_role_has_scope_scope1` FOREIGN KEY (`scope_id`) REFERENCES `scope` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_scope`
--

LOCK TABLES `role_has_scope` WRITE;
/*!40000 ALTER TABLE `role_has_scope` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_scope` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scope`
--

DROP TABLE IF EXISTS `scope`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scope` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `data` varchar(1000) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scope`
--

LOCK TABLES `scope` WRITE;
/*!40000 ALTER TABLE `scope` DISABLE KEYS */;
/*!40000 ALTER TABLE `scope` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `category` varchar(250) DEFAULT NULL,
  `is_reason_required` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES ('eligible','Eligible',NULL,0,'2021-08-05 10:17:55',NULL),('non-eligible','Non-Eligible',NULL,0,'2021-08-05 10:17:55',NULL);
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `full_name` varchar(250) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user_role_idx` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Super Admin','admin','test123','2021-08-05 10:17:51',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_course`
--

DROP TABLE IF EXISTS `user_has_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_course` (
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`course_id`),
  KEY `fk_user_has_course_course1_idx` (`course_id`),
  KEY `fk_user_has_course_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_course_course1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `fk_user_has_course_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_course`
--

LOCK TABLES `user_has_course` WRITE;
/*!40000 ALTER TABLE `user_has_course` DISABLE KEYS */;
INSERT INTO `user_has_course` VALUES (1,1);
/*!40000 ALTER TABLE `user_has_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-13 14:38:08
