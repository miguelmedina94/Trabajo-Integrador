# Trabajo-Integrador
 
## Description
This project is a backend server that is prepared to receive RESTful queries to CRUD employees and assets on a database. And a front-end capable of consuming that API

## Installation
To install the application it is necessary to run the "npm install" command in the folders "backend" and "frontend". And create the detailed database in the Database schema.

## Usage
To use it, the first step is to change the route to "http://localhost:3000/employees".
In the main section there is a list of employees which you can click on the checkbox of each one to delete it or on the row to consult their details. the same way for assets page.

In the employee view page we can also see the assets linked to it.

## Database schema

### Create DB 
CREATE DATABASE vortex;

### Create Employees Table
CREATE TABLE `employees` (  `id` int(11) NOT NULL,  `first_name` varchar(50) NOT NULL,  `last_name` varchar(50) NOT NULL,  `cuit` int(11) DEFAULT NULL,  `team_id` int(11) DEFAULT NULL,  `join_date` date NOT NULL,  `rol` varchar(50) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

### Create Assets Table
CREATE TABLE `assets` (  `id` mediumint(7) NOT NULL,  `name` varchar(50) NOT NULL,  `type` varchar(30) NOT NULL,  `code` varchar(25) DEFAULT NULL,  `description` varchar(200) DEFAULT NULL,  `purchase_date` date NOT NULL,  `employee_id` int(11) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;