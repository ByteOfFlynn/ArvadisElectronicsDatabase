-- CUSTOMERS ENTITY

-- Select data from Customers
SELECT * FROM Customers;

-- Insert data into Customers
INSERT INTO Customers (name, email, contactNumber, address)
VALUES (:name, :email, :contactNumber, :address);

-- Update data into Customers
UPDATE Customers
SET name = :name, email = :email, contactNumber = :contactNumber, address = :address
WHERE customerID = :customerID;

-- Delete data from Customers
DELETE FROM Customers
WHERE customerID = :customerID;

-- PRODUCTS ENTITY

-- Select data from Products
SELECT * FROM Products;

-- Select data from Products for dynamic search
SELECT * FROM Products WHERE name LIKE :name

-- Insert data into Products
INSERT INTO Products (name, type, price, description, quantityAvailable)
VALUES (:name, :type, :price, :description, :quantityAvailable);

-- Update data into Products
UPDATE Products
SET name = :name, type = :type, price = :price, description = :description, quantityAvailable = :quantityAvailable
WHERE productID = :productID;

-- Delete data from Products
DELETE FROM Products
WHERE productID = :productID;

-- SALES ENTITY

-- Select data from Sales
SELECT * FROM Sales;

-- Insert data into Sales
INSERT INTO Sales (date, customerID, employeeID, totalAmount)
VALUES (:date, :customerID, :employeeID, :totalAmount);

-- Update data into Sales
UPDATE Sales
SET date = :date, customerID = :customerID, employeeID = :employeeID, totalAmount = :totalAmount
WHERE saleID = :saleID;

-- Delete data from Sales
DELETE FROM Sales
WHERE saleID = :saleID;

-- EMPLOYEES ENTITY

-- Select data from Employees
SELECT * FROM Employees;

-- Insert data into Employees
INSERT INTO Employees (name, role, companyEmail)
VALUES (:name, :role, :companyEmail);

-- Update data into Employees
UPDATE Employees
SET name = :name, role = :role, companyEmail = :companyEmail
WHERE employeeID = :employeeID;

-- Delete data from Employees
DELETE FROM Employees
WHERE employeeID = :employeeID;

-- SALES_PRODUCTS RELATIONSHIP

-- Select data from Sales_Products
SELECT * FROM Sales_Products;

-- Insert data into Sales_Products
INSERT INTO Sales_Products (saleID, productID)
VALUES (:saleID, :productID);

-- Delete data from Sales_Products
DELETE FROM Sales_Products
WHERE saleID = :saleID AND productID = :productID;

-- Select with JOINS for transaction
SELECT
    Sales.saleID,
    Sales.data AS SaleData,
    Customers.name AS CustomerName,
    Employees.name AS EmployeeName,
    Products.productID,
    Products.name AS ProductName,
    Products.type,
    Products.price,
    Products.description,
    Sales.totalAmount
FROM Sales
JOIN Customers ON Sales.customerID = Customers.customerID
JOIN Employees ON Sales.employeeID = Employees.employeeID
JOIN Sales_Products ON Sales.saleID = Sales_Products.saleID
JOIN Products ON Sales_Products.productID = Products.productID
WHERE Sales.saleID = :saleID;
