const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./connection");

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "task",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "Exit"
            ]
        }
    ]).then(res => {
        const chosenTask = res.task;
        if (chosenTask === "View All Employees") {
            // console.log(chosenTask);
            viewEmployees();
        } else if (chosenTask === "View All Employees By Department") {

        } else if (chosenTask === "View All Employees By Manager") {

        } else if (chosenTask === "Add Employee") {

        } else if (chosenTask === "Remove Employee") {

        } else if (chosenTask === "Update Employee Role") {

        } else if (chosenTask === "Update Employee Manager") {

        } else if (chosenTask === "View All Roles") {

        } else if (chosenTask === "Add Role") {

        } else if (chosenTask === "Remove Role") {

        } else {
            console.log("Goodbye")
            connection.end();
        }
    })
}

start();

function viewEmployees(){
    connection.query("select * from employee_table;", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].first_name + " " + res[i].last_name);
        }
        connection.end();
        start();
        }    
    );
}
function viewEmpByDept(){

}
function viewEmpByMgr(){

}
function addEmployee(){

}
function removeEmployee(){

}
function updateRole(){

}
function updateManager(){

}
function viewRoles(){

}
function addRole(){

}
function removeRole(){

}
//to-do
    // build the departments
    // inside of the departments, create 3-4 different employee roles (titles with salaries)
        // some roles will also be managers
    // build out an existing employee database via a seed.sql file
        // need to make some existing managers
        // not too large, still have room to add employees of any role
    // create seperate js files to house the SQL queries to keep the code clean
    // assign conditional logic to interact with the database. CRUD functionality