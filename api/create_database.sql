CREATE DATABASE appfinder;

USE appfinder;

CREATE TABLE apps (
  id INT NOT NULL AUTO_INCREMENT,
  color VARCHAR(31) NOT NULL,
  icon_url VARCHAR(255) NOT NULL,
  name VARCHAR(63) NOT NULL,
  url VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(31) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE app_categories (
  app_id INT NOT NULL,
  category_id INT NOT NULL,

  PRIMARY KEY (app_id, category_id),
  FOREIGN KEY (app_id) REFERENCES apps (id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);
