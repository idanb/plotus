-- MySQL dump 10.13  Distrib 5.7.18, for macos10.12 (x86_64)
--
-- Host: localhost    Database: plotus
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblCurrency`
--

DROP TABLE IF EXISTS `tblCurrency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblCurrency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `picture_url` varchar(256) NOT NULL,
  `code` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCurrency`
--

LOCK TABLES `tblCurrency` WRITE;
/*!40000 ALTER TABLE `tblCurrency` DISABLE KEYS */;
INSERT INTO `tblCurrency` VALUES (1,'Shekel','https://previews.123rf.com/images/frizio/frizio1512/frizio151200013/49579128-isreaeli-new-shekel-currency-symbol-israel-gold-finishing-Stock-Photo.jpg','ILS'),(2,'Dollar','http://www.psdgraphics.com/file/shiny-gold-dollar-sign.jpg','USD');
/*!40000 ALTER TABLE `tblCurrency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblTransactions`
--

DROP TABLE IF EXISTS `tblTransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblTransactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `offer_user_id` int(11) NOT NULL,
  `accepter_user_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `exchanged_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `currency_offer_type` varchar(4) NOT NULL DEFAULT 'USD',
  `currency_requested_type` varchar(4) NOT NULL DEFAULT 'EUR',
  `currency_offer_amount` double NOT NULL,
  `currency_offer_requested` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblTransactions`
--

LOCK TABLES `tblTransactions` WRITE;
/*!40000 ALTER TABLE `tblTransactions` DISABLE KEYS */;
INSERT INTO `tblTransactions` VALUES (1,2,NULL,0,NULL,'2017-04-22 10:51:08','USD','EUR',30.33,60),(2,1,NULL,0,NULL,'2017-04-22 10:51:08','USD','EUR',30.33,60);
/*!40000 ALTER TABLE `tblTransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUserBalance`
--

DROP TABLE IF EXISTS `tblUserBalance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblUserBalance` (
  `userId` int(11) DEFAULT NULL,
  `currencyId` int(11) NOT NULL DEFAULT '1',
  `value` double NOT NULL DEFAULT '0',
  UNIQUE KEY `userBalance` (`userId`,`currencyId`),
  KEY `BalanceCurrency` (`currencyId`),
  CONSTRAINT `BalanceCurrency` FOREIGN KEY (`currencyId`) REFERENCES `tblCurrency` (`id`),
  CONSTRAINT `UserBalance` FOREIGN KEY (`userId`) REFERENCES `tblUsers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUserBalance`
--

LOCK TABLES `tblUserBalance` WRITE;
/*!40000 ALTER TABLE `tblUserBalance` DISABLE KEYS */;
INSERT INTO `tblUserBalance` VALUES (1,1,22),(2,2,44.4),(1,2,270.2);
/*!40000 ALTER TABLE `tblUserBalance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUsers`
--

DROP TABLE IF EXISTS `tblUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_address` varchar(32) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `profile_picture_url` varchar(512) NOT NULL,
  `social_id` int(9) NOT NULL DEFAULT '0',
  `password` varchar(60) NOT NULL,
  `city` varchar(32) NOT NULL,
  `street` varchar(32) NOT NULL,
  `street_number` int(11) NOT NULL DEFAULT '0',
  `phone_number` int(10) NOT NULL,
  `credit_card` varchar(20) NOT NULL,
  `cc_cw` int(3) NOT NULL,
  `cc_date` varchar(7) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUsers`
--

LOCK TABLES `tblUsers` WRITE;
/*!40000 ALTER TABLE `tblUsers` DISABLE KEYS */;
INSERT INTO `tblUsers` VALUES (1,'idanbelah@gmail.com','Idan','Belassen','https://scontent.ftlv2-1.fna.fbcdn.net/v/t1.0-1/c14.14.172.172/s160x160/282395_10150873383402190_1779300035_n.jpg?oh=2dbce8a435ca6bdf9f5701b1c73d6e56&oe=5998E5C3',38800512,'2411','Ramat-Gan','Elishiv',12,525919049,'4580-2323-1234-1111',233,'2017-04'),(2,'razmargolin@gmail.com','Raz','Margolin','https://plus.google.com/photos/108107186327558394654/albums/profile/6172203834245693618',0,'1234','','',0,0,'0',0,'');
/*!40000 ALTER TABLE `tblUsers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-28 14:51:44
