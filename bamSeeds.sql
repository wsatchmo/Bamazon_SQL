DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price FLOAT(8,2) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Detergent", "Cleaning Supplies", 5.55, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ferrari", "Cars", 600965.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diamond Ring", "Jewelry", 2043.95, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball", "Games", 25.01, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iMac", "Computers", 1055.55, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4", "Games", 255.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mop", "Cleaning Supplies", 12.99, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aspirin", "Medicine", 9.05, 104);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Food", 1.25, 389);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cookies", "Food", 3.95, 141);


select * from products