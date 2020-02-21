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
            viewEmployees();
        } else if (chosenTask === "View All Employees By Department") {
            viewEmpByDept();
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
        start();
        }    
    );
}

function viewEmpByDept(){
    //need a join here to access the employees despartment via the role
    connection.query("select * from employee_table order by role_id", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].first_name + " " + res[i].last_name;
        }
        start();
        }    
    );
}
function viewEmpByMgr(){
    //how to reference the employees manager via the role table?
    //need a join here to access the employee manager

}
function addEmployee(){
    //create a new employee with a fn, ln, roleid and managerid (which will reference a mangers name)

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
    //understanding joins
    // build the departments
    // inside of the departments, create 3-4 different employee roles (titles with salaries)
    // are roles referencing the department ids correctly? they are hard coded as numbers
        // some roles will also be managers
    // build out an existing employee database via a seed.sql file
        // create a manager in each department
        // leave room to add employees in each department
    // assign conditional logic to interact with the database. CRUD functionality