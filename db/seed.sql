INSERT INTO department_table (dept_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

insert into role_table (title, salary, department_id)
Values ("Sales Lead", 100000, 1), ("Salesplerson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Account Lead", 150000, 3), ("Accountant", 120000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 180000, 4);

insert into employee_table (first_name, last_name, role_id, manager_id)
values ("Robert", "Saleshead", 1, null), ("Bobby", "Sellustuff", 2, null), ("James", "Codespert", 4, null);