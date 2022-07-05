-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 04, 2022 at 01:27 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aplo`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(10) UNSIGNED NOT NULL,
  `archived` smallint(6) NOT NULL DEFAULT '0' COMMENT '0:Not Archived, 1:Archived',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `name`, `created_date`, `updated_date`, `updated_by`, `archived`) VALUES
(1, 'test', '2022-07-04 10:35:06', '2022-07-04 10:35:06', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(10) UNSIGNED NOT NULL,
  `archived` smallint(6) NOT NULL DEFAULT '0' COMMENT '0:Not Archived, 1:Archived	',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `created_date`, `updated_date`, `updated_by`, `archived`) VALUES
(1, 'test', '2022-07-04 10:34:46', '2022-07-04 10:34:46', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `business_requests`
--

DROP TABLE IF EXISTS `business_requests`;
CREATE TABLE IF NOT EXISTS `business_requests` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `brand_id` int(10) UNSIGNED DEFAULT NULL,
  `brand_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `activity_id` int(10) UNSIGNED DEFAULT NULL,
  `activity_name` varchar(150) CHARACTER SET utf8 NOT NULL,
  `full_name` varchar(150) CHARACTER SET utf8 NOT NULL,
  `position` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_brand_01` (`brand_id`),
  KEY `FK_activity_01` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `business_requests`
--

INSERT INTO `business_requests` (`id`, `brand_id`, `brand_name`, `activity_id`, `activity_name`, `full_name`, `position`, `email`, `password`, `created_date`) VALUES
(1, 1, 'a', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 10:38:27'),
(20, 1, '1', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 11:51:34'),
(21, 1, '1', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 11:51:49'),
(22, 1, '1', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 11:52:19'),
(23, 1, '1', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 12:14:55'),
(26, 1, '1', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 12:16:43'),
(27, 1, '1', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 12:17:28'),
(40, 1, '1', 1, 'aa', 'aa', 'a', 'a', '123', '2022-07-04 13:54:56');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `parent_id` int(10) UNSIGNED NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `updated_by` int(10) UNSIGNED NOT NULL,
  `archived` smallint(6) NOT NULL DEFAULT '0' COMMENT '0:Not Archived, 1:Archived',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `login_id` int(11) NOT NULL,
  `file` varchar(150) CHARACTER SET utf8 NOT NULL,
  `extra` varchar(1000) NOT NULL,
  `error` varchar(500) CHARACTER SET utf8 NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 NOT NULL,
  `type` smallint(6) NOT NULL COMMENT '1:user, 2:store',
  `verification_token` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password_reset_token` varchar(100) CHARACTER SET utf8 NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `archived` smallint(6) NOT NULL DEFAULT '0' COMMENT '0:Not Archived, 1:Archived',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `tag` varchar(100) CHARACTER SET utf8 NOT NULL,
  `brand_id` int(10) UNSIGNED DEFAULT NULL,
  `upid` varchar(20) CHARACTER SET utf8 NOT NULL,
  `barcode` varchar(20) CHARACTER SET utf8 NOT NULL,
  `featured_image` varchar(100) CHARACTER SET utf8 NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(10) NOT NULL,
  `status` smallint(6) NOT NULL COMMENT '0:Not Active, 1:Active, 2:Requested',
  `archived` smallint(6) NOT NULL COMMENT '0:Not Archived, 1:Archived',
  PRIMARY KEY (`id`),
  KEY `FK_brand_03` (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `profile_category`
--

DROP TABLE IF EXISTS `profile_category`;
CREATE TABLE IF NOT EXISTS `profile_category` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `brand_id` int(10) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(10) UNSIGNED NOT NULL,
  `archived` smallint(6) NOT NULL COMMENT '0:Not Archived, 1:Archived',
  PRIMARY KEY (`id`),
  KEY `FK_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
CREATE TABLE IF NOT EXISTS `store` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `brand_id` int(10) UNSIGNED DEFAULT NULL,
  `activity_id` int(10) UNSIGNED DEFAULT NULL,
  `website` varchar(150) CHARACTER SET utf8 NOT NULL,
  `full_name` varchar(150) CHARACTER SET utf8 NOT NULL,
  `position` varchar(100) CHARACTER SET utf8 NOT NULL,
  `login_id` int(10) UNSIGNED NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(10) UNSIGNED NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1' COMMENT '0:Not Active, 1:Active',
  `archived` smallint(6) NOT NULL COMMENT '0:Not Archived, 1:Archived',
  PRIMARY KEY (`id`),
  KEY `FK_brand_02` (`brand_id`),
  KEY `FK_activity_02` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `business_requests`
--
ALTER TABLE `business_requests`
  ADD CONSTRAINT `FK_activity_01` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `FK_brand_01` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_brand_03` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `profile_category`
--
ALTER TABLE `profile_category`
  ADD CONSTRAINT `FK_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `FK_activity_02` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `FK_brand_02` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
