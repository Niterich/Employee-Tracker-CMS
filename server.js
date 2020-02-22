const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./connection");

// Initalize
function start() {
    inquirer
        .prompt([
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
        ])
        .then(res => {
            // Could use a switch statement here for refactor
            const chosenTask = res.task;
            if (chosenTask === "View All Employees") {
                viewEmployees();
            } else if (chosenTask === "View All Employees By Department") {
                viewEmpByDept();
            } else if (chosenTask === "View All Employees By Manager") {
                viewEmpByMgr();
            } else if (chosenTask === "Add Employee") {
                addEmployee();

                // managerQuery();
            } else if (chosenTask === "Remove Employee") {
                removeEmployee();
            } else if (chosenTask === "Update Employee Role") {
                updateRole();
            } else if (chosenTask === "Update Employee Manager") {
                updateManager();
            } else if (chosenTask === "View All Roles") {
                viewRoles();
            } else if (chosenTask === "Add Role") {
                addRole();
            } else if (chosenTask === "Remove Role") {
                removeRole();
            } else {
                console.log("Goodbye");
                connection.end();
            }
        });
}

start();

//Displays all employees
function viewEmployees() {
    const queryString = `SELECT employee_table.id, employee_table.first_name, employee_table.last_name, role_table.title, department_table.dept_name AS department, role_table.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee_table LEFT JOIN role_table ON employee_table.role_id = role_table.id LEFT JOIN department_table on role_table.department_id = department_table.id LEFT JOIN employee_table manager ON manager.id = employee_table.manager_id ORDER BY employee_table.id;`;
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Displays all employees by their department.
function viewEmpByDept() {
    const queryString = `SELECT employee_table.id, employee_table.first_name, employee_table.last_name, role_table.title, department_table.dept_name AS department FROM employee_table LEFT JOIN role_table ON employee_table.role_id = role_table.id LEFT JOIN department_table ON department_table.id = role_table.department_id ORDER BY role_table.title`;
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//View employees listed in alpahbetical order of their manager.
function viewEmpByMgr() {
    const queryString = `SELECT employee_table.id, employee_table.first_name, employee_table.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee_table LEFT JOIN employee_table manager ON manager.id = employee_table.manager_id ORDER BY manager;`;
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Adds an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please Enter the Employees First Name.",
                name: "fn"
            },
            {
                type: "input",
                message: "Please Enter the Employees Last Name.",
                name: "ln"
            },
            {
                type: "list",
                message: "What is the Employees Role?",
                name: "role_id",
                choices: [
                    "1 - Sales Lead",
                    "2 - Salesperson",
                    "3 - Lead Engineer",
                    "4 - Software Engineer",
                    "5 - Account Lead",
                    "6 - Accountant",
                    "7 - Legal Team Lead",
                    "8 - Lawyer"
                ]
            }
        ])
        .then(res => {
            let roleNum = parseInt(res.role_id.charAt(0));
            console.log(roleNum);
            let ifManager = null;
            if (roleNum === 2 || 4 || 6 || 8) {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Who is the employees manager?",
                            name: "manager",
                            choices: managerQuery()
                        }
                    ])
                    .then(res => {
                        ifManager = res.manager;
                    });
            }
            // This add query is not working
            const queryString = `INSERT INTO employee_table (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
            connection.query(
                queryString,
                [res.fn, res.ln, roleNum, ifManager],
                function(err, res) {
                    if (err) throw err;
                    console.table("Employee Added!");
                    start();
                }
            );
        });
}

// Removes an Employee
function removeEmployee() {
    const queryString = `SELECT * FROM employee_table;`;
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        let employeeArray = [];
        for (let i = 0; i < res.length; i++) {
            employeeArray.push(`${res[i].first_name}`);
            console.log(employeeArray);
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Who do you want to remove?",
                    name: "remove",
                    //employee array is not defined??
                    choices: employeeArray
                }
            ])
            .then(res => {
                const queryString = `DELETE FROM employee_table WHERE first_name = ${res.remove};`;
                connection.query(queryString, function(err, res) {
                    if (err) throw err;
                    console.table("Employee Deleted!");
                    start();
                });
            });
    });
}

// Updates an employees role
function updateRole() {
    //inquirer to select employee, change role id number to different role id number
    const queryString = `UPDATE employee_table
    SET role_id=? WHERE first_name=?;`;
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.table("Role Updated!");
        start();
    });
}

// Updates an Employees Manager
function updateManager() {
    //inquirer to select employee, change manager
    const queryString = `UPDATE employee_table
    SET manager_id=? WHERE first_name=?;`;
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.table("Manager Updated!");
        start();
    });
}

// Lists the role_table
function viewRoles() {
    const queryString = "SELECT * FROM role_table;";
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Adds a job to the role_table
function addRole() {
    //need inquirer to get title, salary, and which department the role will be in.
    const queryString =
        "INSERT INTO role_table (title, salary, department_id) values (?, ?, ?);";
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.log("Role Added!");
        start();
    });
}

// Removes a job from the role table
function removeRole() {
    //inquirer to identify the role to be removed
    const queryString = "DELETE FROM role_table WHERE role.title = ?;";
    connection.query(queryString, function(err, res) {
        if (err) throw err;
        console.log("Role Removed!");
        start();
    });
}

//to fix
// switch statements
// fix remove employee (query) and add employee (query)
// fix update roles and managers
// fix add and remove roles
function managerQuery() {
    const queryString = `SELECT * FROM employee_table;`;
    connection.query(queryString, (err, data) => {
        if (err) throw err;
        const managers = data.filter(mgr => 
        mgr.manager_id == null);
        // push manager names into new array to be compatible with inquirer
        return managers;
    });
}
