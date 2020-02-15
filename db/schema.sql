DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- DROP Table department_table;

Create Table department_table (
    id int not null AUTO_INCREMENT,
    dept_name varchar(30),
    primary key (id)
);

-- DROP TABLE role_table;

CREATE TABLE role_table (
    id INT not null AUTO_INCREMENT,
    title varchar(30),
    salary DECIMAL(10,4),
    department_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) references department_table(id)
);

-- DROP TABLE employee_table;

CREATE TABLE employee_table (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) not NULL,
  last_name varchar(30) not NULL,
  role_id int not NULL,
  manager_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) references role_table(id),
  FOREIGN KEY (manager_id) references employee_table(id)
);

select * from employee_table;