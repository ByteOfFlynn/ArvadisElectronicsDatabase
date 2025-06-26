# Arvadis Electronics Database

This project is a relational database schema designed for **Arvadis Electronics**, a fictional but realistic electronics retail company operating at large scale. The database models key business operations including customer management, employee tracking, product inventory, and sales transactions. It is designed for efficient data storage, integrity, and easy querying in support of both in-store and online operations. It handles front-end, back-end, and all CRUD operations.

## Overview

Arvadis generates over $50M in annual revenue and manages:

- 100,000+ products sold annually  
- 50,000 customers  
- 5,000 employees

The database is optimized for structured data access and efficient querying in support of transactional business operations.

---

## Database Outline

###  Customers

Stores details of customers who engage with Arvadis.

- `customerID`: `INT`, `AUTO_INCREMENT`, `PRIMARY KEY`, `NOT NULL`
- `name`: `VARCHAR(255)`, `NOT NULL`
- `email`: `VARCHAR(255)`, `NOT NULL`
- `contactNumber`: `VARCHAR(255)`
- `address`: `VARCHAR(255)`
- **Relationship**: One-to-many with `Sales` (via `customerID` foreign key)

---

###  Products

Contains information about products sold by Arvadis.

- `productID`: `INT`, `AUTO_INCREMENT`, `PRIMARY KEY`, `NOT NULL`
- `name`: `VARCHAR(255)`, `NOT NULL`
- `type`: `VARCHAR(255)`
- `price`: `DECIMAL(10,2)`, `NOT NULL`
- `description`: `TEXT`
- `quantityAvailable`: `INT`, `NOT NULL`
- **Relationship**: Many-to-many with `Sales`, joined via `Sales_Products` (`productID`, `saleID`)

---

###  Sales

Tracks sales transactions across Arvadis stores.

- `saleID`: `INT`, `AUTO_INCREMENT`, `PRIMARY KEY`, `NOT NULL`
- `date`: `DATETIME`, `NOT NULL`
- `customerID`: `INT`, `NOT NULL`, `FOREIGN KEY` → `Customers(customerID)`
- `employeeID`: `INT`, `FOREIGN KEY` → `Employees(employeeID)`
- `totalAmount`: `DECIMAL(10,2)`, `NOT NULL`
- **Relationships**:
  - Many-to-one with `Customers`
  - Many-to-one with `Employees`
  - Many-to-many with `Products` (via `Sales_Products`)

---

###  Employees

Stores information on Arvadis staff.

- `employeeID`: `INT`, `AUTO_INCREMENT`, `PRIMARY KEY`, `NOT NULL`
- `name`: `VARCHAR(255)`, `NOT NULL`
- `role`: `VARCHAR(255)`
- `companyEmail`: `VARCHAR(255)`
- **Relationship**: One-to-many with `Sales` (via `employeeID` foreign key)

---

## Junction Table: `Sales_Products`

Defines a many-to-many relationship between `Sales` and `Products`.

- `saleID`: `INT`, `FOREIGN KEY` → `Sales(saleID)`
- `productID`: `INT`, `FOREIGN KEY` → `Products(productID)`

---
## Entity-Relationship Diagram
![image](https://github.com/user-attachments/assets/edad5686-6fb4-44fe-8379-a51a0627a66f)
---
## Schema
![image](https://github.com/user-attachments/assets/16bc3c76-8df3-4706-bca6-d949c8495914)
---

## Tech Stack

- SQL (engine-agnostic schema: MySQL, PostgreSQL, SQLite)
- Normalized relational model
- Designed for use in enterprise backend systems
