CREATE
DATABASE  IF NOT EXISTS `charityevents_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE
`charityevents_db`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories`
(
    `category_id` int          NOT NULL AUTO_INCREMENT,
    `name`        varchar(100) NOT NULL,
    PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK
TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories`
VALUES (4, 'Fun Run'),
       (5, 'Gala'),
       (6, 'Auction'),
       (7, 'Community Fair'),
       (8, 'Benefit Concert');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events`
(
    `event_id`        int          NOT NULL AUTO_INCREMENT,
    `name`            varchar(150) NOT NULL,
    `description`     text,
    `ticket_price`    decimal(8, 2) DEFAULT NULL,
    `event_date`      date         NOT NULL,
    `start_time`      time          DEFAULT NULL,
    `end_time`        time          DEFAULT NULL,
    `location`        varchar(200)  DEFAULT NULL,
    `status`          enum('upcoming','past','suspended') NOT NULL DEFAULT 'upcoming',
    `category_id`     int          NOT NULL,
    `organisation_id` int          NOT NULL,
    PRIMARY KEY (`event_id`),
    KEY               `fk_events_category` (`category_id`),
    KEY               `fk_events_org` (`organisation_id`),
    KEY               `idx_event_date` (`event_date`),
    KEY               `idx_status` (`status`),
    CONSTRAINT `fk_events_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_events_org` FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`organisation_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK
TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events`
VALUES (1, 'Spring Charity Fun Run', '5km/10km run along the foreshore to support youth tutoring.', '10.00', '2025-10-05',
        '08:00:00', '11:30:00', 'Byron Bay Foreshore, NSW', 'upcoming', 4, 1),
       (2, 'Gala for Community Resilience', 'Black-tie dinner raising funds for flood-prep kits.', '4.00','2025-11-15',
        '18:30:00', '22:30:00', 'Elements of Byron, NSW', 'upcoming', 5, 2),
       (3, 'Harvest Community Fair', 'Family day with stalls, games, and local music.', '0.00','2025-10-20', '10:00:00',
        '16:00:00', 'Mullumbimby Showgrounds, NSW', 'upcoming', 7, 3),
       (4, 'Acoustic Evenings Benefit', 'Intimate acoustic sets to fund pantry vouchers.', '10.00', '2025-12-06', '19:00:00',
        '22:00:00', 'The Regent, Murwillumbah, NSW', 'upcoming', 8, 3),
       (5, 'Winter Warmers Auction', 'Auctioning donated goods for heating grants.','3.00', '2025-08-17', '14:00:00',
        '17:00:00', 'Lismore City Hall, NSW', 'past', 6, 1),
       (6, 'Ocean Care Gala', 'Dinner & keynote on coastal restoration.', '1.00','2025-07-12', '18:30:00', '22:00:00',
        'Ballina RSL Club, NSW', 'past', 5, 2),
       (7, 'Creekside Fun Run', 'Track temporarily unsafe after heavy rain.', '10.00', '2025-09-21', '08:00:00', '11:00:00',
        'Brunswick Heads, NSW', 'suspended', 4, 1),
       (8, 'Community Pantry Fair', 'Local growers & cooking demos to support pantry cards.','0.00', '2025-10-12', '09:00:00',
        '15:00:00', 'Tweed Heads Civic Centre, NSW', 'upcoming', 7, 3),
       (9, 'Sounds for Shelter', 'Benefit concert for temporary housing supports.', '3.00','2025-06-28', '18:00:00',
        '22:30:00', 'Seagulls Club, Tweed Heads West, NSW', 'past', 8, 2);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `organisations`
--

DROP TABLE IF EXISTS `organisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisations`
(
    `organisation_id` int          NOT NULL AUTO_INCREMENT,
    `name`            varchar(150) NOT NULL,
    `description`     text,
    `contact`         varchar(150) DEFAULT NULL,
    PRIMARY KEY (`organisation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisations`
--

LOCK
TABLES `organisations` WRITE;
/*!40000 ALTER TABLE `organisations` DISABLE KEYS */;
INSERT INTO `organisations`
VALUES (1, 'Helping Hands Northern Rivers', 'Education & youth programs across the region.', 'info@helpinghandsnr.org'),
       (2, 'Byron Coast Aid', 'Community resilience & climate recovery initiatives.', 'hello@byroncoastaid.org'),
       (3, 'Tweed Food Collective', 'Food security and pantry support.', 'contact@tweedfoodcollective.au');
/*!40000 ALTER TABLE `organisations` ENABLE KEYS */;
UNLOCK
TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-09 12:38:42
