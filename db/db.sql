CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id VARCHAR(36),
  name VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  picture VARCHAR(200),
  PRIMARY KEY (id)
) ENGINE=innodb;

CREATE TABLE connections (
  user1_id VARCHAR(36),
  user2_id VARCHAR(36),
  PRIMARY KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES users (id),
  FOREIGN KEY (user2_id) REFERENCES users (id)
) ENGINE=innodb;

CREATE TABLE messages (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  content TEXT NOT NULL,
  from_user VARCHAR(36),
  to_user VARCHAR(36),
  sent_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read_date DATETIME,
  deleted DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (from_user) REFERENCES users (id),
  FOREIGN KEY (to_user) REFERENCES users (id)
) ENGINE=innodb;