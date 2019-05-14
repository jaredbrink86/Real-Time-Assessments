DROP DATABASE IF EXISTS assessments;

CREATE DATABASE assessments;

USE assessments;


CREATE TABLE students (
  id int NOT NULL AUTO_INCREMENT,
  student_name text NOT NULL, 
  PRIMARY KEY (ID)
);

CREATE TABLE elements (
  id int NOT NULL AUTO_INCREMENT,
  element_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE targets (
  id int NOT NULL AUTO_INCREMENT,
  element_id int NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (element_id) REFERENCES elements (id)
);

CREATE TABLE completed_targets (
  id int PRIMARY KEY AUTO_INCREMENT;
  target_id int NOT NULL,
  student_id int NOT NULL,
  completed boolean,
  FOREIGN KEY (target_id)
  REFERENCES targets (id),
  FOREIGN KEY (student_id)
  REFERENCES students (id)
); 

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

