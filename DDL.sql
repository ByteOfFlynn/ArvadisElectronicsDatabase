-- Disable foregin key and commits for error prevention
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop tables to prevent exist errors
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;

-- Create Customers Table
CREATE TABLE Customers (
    customerID INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(255),
    address VARCHAR(255),
    PRIMARY KEY (customerID)
);

-- Create Products Table
CREATE TABLE Products (
    productID INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    quantityAvailable INT NOT NULL,
    PRIMARY KEY (productID)
);

-- Create Employees Table
CREATE TABLE Employees (
    employeeID INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    companyEmail VARCHAR(255),
    PRIMARY KEY (employeeID)
);

-- Create Sales Table
CREATE TABLE Sales (
    saleID INT NOT NULL AUTO_INCREMENT UNIQUE,
    date DATETIME NOT NULL,
    customerID INT NOT NULL,
    employeeID INT,
    totalAmount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (saleID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Junction Table Sales_Products
CREATE TABLE Sales_Products (
    saleID INT,
    productID INT,
    FOREIGN KEY (saleID) REFERENCES Sales(saleID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products(productID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (saleID, productID)
);

-- Insert Customer Data
INSERT INTO Customers (customerID, name, email, contactNumber, address) VALUES
(1001, 'Allen Smith', 'allen.smith@gmail.com', '7157344910', '751 Bingamon Branch Road Wheeling, IL 60090'),
(1002, 'Roxanne Wicker', 'roxanne.wicker@gmail.com', '9157344910', '348 Rainbow Road San Gabriel, CA 91775'),
(1003, 'Shoshanna Jackson', 'shoshanna.jackson@gmail.com', '8157344910', '152 Peaceful Lane Warrensville Heights, OH 44128');

-- Insert Product Data
INSERT INTO Products (productID, name, type, price, description, quantityAvailable) VALUES
(30001, 'MacBook', 'Laptop', 560.00, 'Apple branded, three gens back', 550),
(30087, 'I-phone 14', 'Phone', 1200.00, 'Apple branded, new release with various colors', 50),
(30100, 'I-Pad', 'Tablet', 330.55, 'Apple branded, earlier model, discounted', 720);

-- Insert Employee Data
INSERT INTO Employees (employeeID, name, role, companyEmail) VALUES
(5657, 'Lam Hoang', 'Manager', 'lam.hoang@arvadis.com'),
(5656, 'Huy Moon', 'Associate', 'huy.moon@arvadis.com'),
(5644, 'Ryan Duc', 'Assistant Manager', 'ryan.duc@arvadis.com');

-- Insert Sale Data
INSERT INTO Sales (saleID, date, customerID, employeeID, totalAmount) VALUES
(2660, '2023-02-08 13:00:00', 1001, 5657, 560.00),
(2450, '2023-02-08 17:00:00', 1002, 5656, 1200.00),
(2300, '2023-02-08 09:00:00', 1003, 5644, 330.55);

-- Insert Sales_Products Data
INSERT INTO Sales_Products (saleID, productID) VALUES
(2660, 30001),
(2450, 30087),
(2300, 30100);

-- Enable foreign key and commit
SET FOREIGN_KEY_CHECKS=1;
COMMIT;