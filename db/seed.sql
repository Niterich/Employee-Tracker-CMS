INSERT INTO department_table (dept_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role_table (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Account Lead", 150000, 3), ("Accountant", 120000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 180000, 4);

INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Saleshead", 1, null), ("Bobby", "Sellustuff", 2, 1), ("Steven", "Codemasta", 3, null), ("Jonny", "Semicodes", 4, 3), ("Erik", "VonMonay", 5, null), ("Betty", "Kash", 6, 5), ("Saul", "Goodman", 7, null), ("Sally", "Law", 8, 7);