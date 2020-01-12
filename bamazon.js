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
  password: "",
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
        })
        .then(function(answer1) {
        // based on their answer, let them know --
        connection.query("SELECT item_id FROM products WHERE ?", {item_id: answer1.product_id}, function(err, res) {
            if (err) throw err;
            console.log("PRODUCT ID: ", res[0].item_id, "ITEM: ", res[0].product_name); // Log all results 
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
        // based on their answer--
        connection.query("SELECT stock_quantity FROM products WHERE ?", {item_id: answer1.product_id}, function(err, res) {
            if (err) throw err;
            var stockAmt = res[0].stock_quantity;
            console.log("Quantity AMT.: ", stockAmt); // Log all results 
            console.log("Order AMT.: ", answer2.amount); // Log desired quantity 
            if (stockAmt < answer2.amount){ //EITHER - There is not enough quantity
                console.log("NOT ENOUGH STOCK -- TRY AGAIN");
                selectAmount(answer1);
            } else {
                console.log("Your order has been placed -- thank you for shopping as Bamazon!"); //OR - That their order has been placed
                var newStock = stockAmt - answer2.amount; // update quantity
                console.log("Stock updated from " + stockAmt + " to " + newStock);
                connection.query("UPDATE products SET stock_quantity=" + newStock + " WHERE item_id=" + answer1.product_id, function(err, res) {
                    if (err) throw err;
                });
                inquirer
                .prompt({
                    name: "exiter",
                    type: "list",
                    choices: ["Yes", "No"],
                    message: "Would you like to order something else?"
                }).then(function(answer) {
                    if (answer.exiter === "Yes"){
                        postProducts();
                    } else if (answer.exiter === "No"){
                        connection.end();
                    }
                });
            }  
        });
    });
}