CREATE DATABASE appfinder;

USE appfinder;

CREATE TABLE apps (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  color VARCHAR(31) NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  description VARCHAR(255),
  icon_url VARCHAR(255) NOT NULL,
  name VARCHAR(63) NOT NULL,
  url VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE categories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(31) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE app_categories (
  app_id INT UNSIGNED NOT NULL,
  category_id INT UNSIGNED NOT NULL,

  PRIMARY KEY (app_id, category_id),
  FOREIGN KEY (app_id) REFERENCES apps (id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);
