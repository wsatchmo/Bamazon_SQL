console.log("RUNNING...")

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "MrMeseeksorgy",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  postProducts();
});

function postProducts(){
    connection.query('SELECT * FROM products', function(err, res) {
        console.log("\n");
        for (var i = 0; i < res.length; i++){
            console.log(`Item ID: ${res[i].item_id} | Item: ${res[i].product_name} | Department: ${res[i].department_name} | Price: ${res[i].price} | Stock: ${res[i].stock_quantity}`);
        }
        afterDisplay();
    });
    
}

function afterDisplay() {
    inquirer
    .prompt({
        name: "product",
        type: "number",
        message: "What is the ID of the product you would like to search?"
        },
        
        {
            name: "amount",
            type: "number",
            message: "How many units would you like to order?"
        })
        .then(function(answer) {
        // based on their answer, let them know --
        //There is not a product by that ID
        //OR - There is not enough quantity
        //OR - That their order has been placed; update quantity & re-print
    });
}