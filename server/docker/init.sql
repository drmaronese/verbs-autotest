CREATE DATABASE IF NOT EXISTS VerbsAutotest;

USE VerbsAutotest;

CREATE TABLE IF NOT EXISTS verbs (
    id INT PRIMARY KEY,
    base_form VARCHAR(100),
    simple_past VARCHAR(100),
    past_participle VARCHAR(100),
    meaning VARCHAR(100)
);

LOAD DATA INFILE '/var/lib/mysql-files/irregular-verbs.csv'
INTO TABLE verbs
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;
