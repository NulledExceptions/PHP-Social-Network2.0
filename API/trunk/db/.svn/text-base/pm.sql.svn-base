# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.1.61-log)
# Database: pm
# Generation Time: 2012-04-13 17:28:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `plate_id` bigint(20) NOT NULL DEFAULT '0',
  `username` varchar(24) NOT NULL,
  `email` varchar(160) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `createdon` datetime NOT NULL,
  `verifiedon` datetime DEFAULT NULL,
  `lastsignedinon` datetime DEFAULT NULL,
  `resetsenton` datetime DEFAULT NULL,
  `deletedon` datetime DEFAULT NULL,
  `suspendedon` datetime DEFAULT NULL,
  `fname` varchar(255) NOT NULL DEFAULT 'Anonymous',
  `lname` varchar(255) NOT NULL DEFAULT '',
  `birthday` date NOT NULL DEFAULT '0000-00-00',
  `gender` char(1) DEFAULT NULL,
  `interested_in` char(1) DEFAULT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `token` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;



# Dump of table advertisements
# ------------------------------------------------------------

DROP TABLE IF EXISTS `advertisements`;

CREATE TABLE `advertisements` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `payperview` varchar(255) DEFAULT NULL,
  `payperclick` varchar(255) DEFAULT NULL,
  `budget` varchar(255) DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `audience` varchar(255) DEFAULT NULL,
  `account_id` varchar(255) DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table ci_session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ci_session`;

CREATE TABLE `ci_session` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(16) NOT NULL DEFAULT '0',
  `user_agent` varchar(50) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;



# Dump of table favorites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorites`;

CREATE TABLE `favorites` (
  `source_id` int(20) NOT NULL,
  `target_id` int(20) NOT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `createdon` datetime NOT NULL,
  KEY `source_id` (`source_id`,`target_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table five_star_ratings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `five_star_ratings`;

CREATE TABLE `five_star_ratings` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `wall_post_id` int(20) DEFAULT NULL,
  `account_id` int(20) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `postedon` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table followers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `followers`;

CREATE TABLE `followers` (
  `account_id` int(20) NOT NULL,
  `plate_id` int(20) NOT NULL,
  `createdon` datetime NOT NULL,
  KEY `account_id` (`account_id`),
  KEY `plate_id` (`plate_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table gallery
# ------------------------------------------------------------

DROP TABLE IF EXISTS `gallery`;

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) DEFAULT NULL,
  `plate_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `uploadedon` datetime DEFAULT NULL,
  `media_type` varchar(255) DEFAULT 'image',
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table notifications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notifications`;

CREATE TABLE `notifications` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `message` text,
  `type` varchar(255) NOT NULL DEFAULT '',
  `target_id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `unread` int(11) NOT NULL DEFAULT '1',
  `show` int(11) NOT NULL DEFAULT '1',
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table plates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `plates`;

CREATE TABLE `plates` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `plate` varchar(255) NOT NULL DEFAULT '',
  `account_id` int(20) NOT NULL DEFAULT '0',
  `make` varchar(255) NOT NULL DEFAULT 'Unknown',
  `model` varchar(255) NOT NULL DEFAULT '',
  `color` varchar(255) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `createdon` datetime NOT NULL,
  `access` int(11) NOT NULL DEFAULT '4',
  `plate_pic_url` varchar(255) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table private_messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `private_messages`;

CREATE TABLE `private_messages` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(20) NOT NULL,
  `receiver_id` int(20) NOT NULL,
  `content` text,
  `senton` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table wall_posts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `wall_posts`;

CREATE TABLE `wall_posts` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `plate_id` int(20) NOT NULL,
  `account_id` int(20) NOT NULL,
  `content` text,
  `postedon` datetime NOT NULL,
  `parent_id` int(20) NOT NULL,
  `avg_rating` double NOT NULL,
  `deletedon` datetime DEFAULT NULL,
  `img_url` text,
  `vid_url` text,
  `vid_thumb_url` text,
  `link_url` text,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `access` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
