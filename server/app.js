/*
    SETUP
*/


// Express
var express = require('express');   
var app     = express();      
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))    
PORT        = 9115;                 

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"})); 
app.set('view engine', '.hbs');                


/*
    ROUTES
*/


// Index
app.get('/', function(req, res)
    {
        res.render('index');                    
    });                                        


// Customers
app.get('/customers', (req, res) => {
    // SELECT 1
    let customer1 = "SELECT * FROM Customers;";
    db.pool.query(customer1, function(error, rows, fields){
        res.render('customers', {data: rows});
    })
});

app.post('/add-customer', function(req, res){
    let data = req.body;
    // INSERT 1
    customer2 = `INSERT INTO Customers (name, email, contactNumber, address) VALUES ('${data['name']}', '${data['email']}', '${data['contactNumber']}', '${data['address']}')`;
    db.pool.query(customer2, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/customers');
        }
    })
})

app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customerID);
    let customer3 = `DELETE FROM Customers WHERE customerID = ?`;
        db.pool.query(customer3, [customerID], function(error, rows, fields){
            if (error) {
            console.log(error);
            res.sendStatus(400);
            } else {
            res.sendStatus(204);
            }
})});

app.put('/update-customer-ajax', function(req, res) {
    let data = req.body;
    let customerID = parseInt(data.customerID);
    let name = data.name;
    let email = data.email;
    let contactNumber = data.contactNumber;
    let address = data.address;
    let customer4 = `UPDATE Customers SET name = ?, email = ?, contactNumber = ?, address = ? WHERE customerID = ?`;
    db.pool.query(customer4, [name, email, contactNumber, address, customerID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/get-customer/:customerID', (req, res) => {
    let { customerID } = req.params;
    let customer5 = "SELECT customerID, name, email, contactNumber, address FROM Customers WHERE customerID = ?;";
    db.pool.query(customer5, [customerID], (error, results) => {
        if (error) {
            console.log(error);
            res.status(400);
        } else {
            res.json(results[0] || {});
        }
    });
});


// Products
app.get('/products', (req, res) => {
    let product1;
    // SELECT 2
    if (req.query.name === undefined) {
        product1 = "SELECT * FROM Products;";
    }
    // Dynamic Search
    else {
        product1 = `SELECT * FROM Products WHERE name LIKE "${req.query.name}%"`
    }
    db.pool.query(product1, function(error, rows, fields){
        res.render('products', {data: rows});
    })
});

app.post('/add-product', function(req, res){
    let data = req.body;
    // INSERT 2
    product2 = `INSERT INTO Products (name, type, price, description, quantityAvailable) VALUES ('${data['name']}', '${data['type']}', '${data['price']}', '${data['description']}', '${data['quantityAvailable']}')`;
    db.pool.query(product2, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/products');
        }
    })
})

app.delete('/delete-product-ajax/', function(req,res,next){
    let data = req.body;
    let productID = parseInt(data.productID);
    let product3 = `DELETE FROM Products WHERE productID = ?`;
        db.pool.query(product3, [productID], function(error, rows, fields){
            if (error) {
            console.log(error);
            res.sendStatus(400);
            } else {
            res.sendStatus(204);
            }
})});

app.put('/update-product-ajax', function(req, res) {
    let data = req.body;
    
    let productID = parseInt(data.productID);
    let name = data.name;
    let type = data.type;
    let price = parseFloat(data.price);
    let description = data.description;
    let quantityAvailable = parseInt(data.quantityAvailable);
    
    let product4 = `UPDATE Products SET name = ?, type = ?, price = ?, description = ?, quantityAvailable = ? WHERE productID = ?`;
    db.pool.query(product4, [name, type, price, description, quantityAvailable, productID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/get-product/:productID', (req, res) => {
    let { productID } = req.params;
    let product5 = "SELECT productID, name, type, price, description, quantityAvailable FROM Products WHERE productID = ?;";
    db.pool.query(product5, [productID], (error, results) => {
        if (error) {
            console.log(error);
            res.status(400);
        } else {
            res.json(results[0] || {});
        }
    });
});


// Sales
app.get('/sales', (req, res) => {

    // SELECT 3
    let sale1 = "SELECT * FROM Sales;";
    let sale2 = "SELECT customerID, name FROM Customers;";
    let sale3 = "SELECT employeeID, name FROM Employees;";

    db.pool.query(sale1, function(error, salesRows, fields){

        db.pool.query(sale2, function(error, customerRows, fields){

            db.pool.query(sale3, (error, employeeRows, fields) => {
                
                res.render('sales', {
                    sales: salesRows,
                    customers: customerRows,
                    employees: employeeRows
                });
            });
        });
    });
});

app.post('/add-sale', function(req, res){
    let data = req.body;
    let employeeID = data['employeeID'] === '' ? 'NULL' : `'${data['employeeID']}'`;
    // INSERT 3
    sale4 = `INSERT INTO Sales (date, customerID, employeeID, totalAmount) VALUES ('${data['date']}', '${data['customerID']}', ${employeeID}, '${data['totalAmount']}')`;
    db.pool.query(sale4, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/sales');
        }
    })
})

app.delete('/delete-sale-ajax/', function(req,res,next){
    let data = req.body;
    let saleID = parseInt(data.saleID);
    let sale5 = `DELETE FROM Sales WHERE saleID = ?`;
        db.pool.query(sale5, [saleID], function(error, rows, fields){
            if (error) {
            console.log(error);
            res.sendStatus(400);
            } else {
            res.sendStatus(204);
            }
})});

app.put('/update-sale-ajax', function(req, res) {
    let data = req.body;
    
    // UPDATE NULLable
    let saleID = parseInt(data.saleID);
    let date = data.date;
    let customerID = parseInt(data.customerID);
    let employeeID = data.employeeID === '' ? null : parseInt(data.employeeID);
    let totalAmount = parseFloat(data.totalAmount);
    
    let sale6 = `UPDATE Sales SET date = ?, customerID = ?, employeeID = ?, totalAmount = ? WHERE SaleID = ?`;
    db.pool.query(sale6, [date, customerID, employeeID, totalAmount, saleID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/get-sale/:saleID', (req, res) => {
    let { saleID } = req.params;
    let sale6 = "SELECT saleID, date, customerID, employeeID, totalAmount FROM Sales WHERE saleID = ?;";
    db.pool.query(sale6, [saleID], (error, results) => {
        if (error) {
            console.log(error);
            res.status(400);
        } else {
            res.json(results[0] || {});
        }
    });
});


// Employees
app.get('/employees', (req, res) => {
    // SELECT 4
    let employee1 = "SELECT * FROM Employees;";
    db.pool.query(employee1, function(error, rows, fields){
        res.render('employees', {data: rows});
    })
});

app.post('/add-employee', function(req, res){
    let data = req.body;
    // INSERT 4
    employee2 = `INSERT INTO Employees (name, role, companyEmail) VALUES ('${data['name']}', '${data['role']}', '${data['companyEmail']}')`;
    db.pool.query(employee2, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/employees');
        }
    })
})

app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.employeeID);
    let employee3 = `DELETE FROM Employees WHERE employeeID = ?`;
        db.pool.query(employee3, [employeeID], function(error, rows, fields){
            if (error) {
            console.log(error);
            res.sendStatus(400);
            } else {
            res.sendStatus(204);
            }
})});

app.put('/update-employee-ajax', function(req, res) {
    let data = req.body;
    let employeeID = parseInt(data.employeeID);
    let name = data.name;
    let role = data.role;
    let companyEmail = data.companyEmail;
    let employee4 = `UPDATE Employees SET name =?, role = ?, companyEmail = ? WHERE employeeID = ?`;
    db.pool.query(employee4, [name, role, companyEmail, employeeID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/get-employee/:employeeID', (req, res) => {
    let { employeeID } = req.params;
    let employee5 = "SELECT employeeID, name, role, companyEmail FROM Employees WHERE employeeID = ?;";
    db.pool.query(employee5, [employeeID], (error, results) => {
        if (error) {
            console.log(error);
            res.status(400);
        } else {
            res.json(results[0] || {});
        }
    });
});


// Sales_Products
app.get('/sales_products', (req, res) => {

    // SELECT 5
    let sale_product1 = "SELECT * FROM Sales_Products;";
    let sale_product2 = "SELECT saleID, date FROM Sales;";
    let sale_product3 = "SELECT productID, name FROM Products;";

    db.pool.query(sale_product1, function(error, salesproductsRows, fields){

        db.pool.query(sale_product2, function(error, salesRows, fields){

            db.pool.query(sale_product3, (error, productsRows, fields) => {
                
                res.render('sales_products', {
                    sales_products: salesproductsRows,
                    sales: salesRows,
                    products: productsRows
                });
            });
        });
    });
});

app.post('/add-sale_product', function(req, res){
    let data = req.body;
    // INSERT 5
    sale_product4 = `INSERT INTO Sales_Products (saleID, productID) VALUES ('${data['saleID']}', '${data['productID']}')`;
    db.pool.query(sale_product4, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/sales_products');
        }
    })
})

app.delete('/delete-sale_product-ajax/', function(req,res,next){
    let data = req.body;
    let saleID = parseInt(data.saleID);
    let productID = parseInt(data.productID);
    // DELETE (M:M)
    let sale_product5 = `DELETE FROM Sales_Products WHERE saleID = ? AND productID = ?`;
        db.pool.query(sale_product5, [saleID, productID], function(error, rows, fields){
            if (error) {
            console.log(error);
            res.sendStatus(400);
            } else {
            res.sendStatus(204);
            }
})});

app.put('/update-sale_product-ajax', function(req, res) {
    let data = req.body;
    let saleID = parseInt(data.saleID);
    let oldproductID = parseInt(data.productID);
    let newproductID = parseInt(data.newproductID);
    // UPDATE (M:M)
    let sale_product6 = `UPDATE Sales_Products SET productID = ? WHERE saleID = ? AND productID = ?`;
    db.pool.query(sale_product6, [newproductID, saleID, oldproductID], function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/get-sale_product/:saleID/:productID', (req, res) => {
    let { saleID, productID } = req.params;
    let sale_product7 = "SELECT saleID, productID FROM Sales_Products WHERE saleID = ? AND productID = ?;";
    db.pool.query(sale_product7, [saleID, productID], (error, results) => {
        if (error) {
            console.log(error);
            res.status(400);
        } else {
            res.json(results[0] || {});
        }
    });
});


/*
    LISTENER
*/


app.listen(PORT, function(){           
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});