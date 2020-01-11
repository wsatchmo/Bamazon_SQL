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
        name: "product_id",
        type: "number",
        message: "What is the ID of the product you would like to search?"
        //ADD A VALIDATE SO IT HAS TO BE IN THE DATABASE
        })
        .then(function(answer1) {
        // based on their answer, let them know --
        connection.query("SELECT item_id FROM products WHERE ?", {item_id: answer1.product_id}, function(err, res) {
            if (err) throw err;
            console.log("PRODUCT ID: ", res[0].item_id); // Log all results 
            if (res.length === 0){ //There is not a product by that ID
                console.log("INVALID SELECTION -- EXITING");
                connection.end();
            } else {
                selectAmount(answer1); //If ID exists, select amount
            }  
        });
    });
}

function selectAmount(answer1){
    inquirer
    .prompt({
        name: "amount",
        type: "number",
        message: "How many units would you like to order?"
        })
        .then(function(answer2) {
        // based on their answer, let them know --
        connection.query("SELECT stock_quantity FROM products WHERE ?", {item_id: answer1.product_id}, function(err, res) {
            if (err) throw err;
            console.log("Quantity AMT.: ", res[0].stock_quantity); // Log all results 
            console.log("Order AMT.: ", answer2.amount); // Log desired quantity 
            if (res[0].stock_quantity < answer2.amount){ //EITHER - There is not enough quantity
                console.log("NOT ENOUGH STOCK -- EXITING");
                connection.end();
            } else {
                //OR - That their order has been placed; update quantity & re-print products 
            }  
        });
       
    });
}