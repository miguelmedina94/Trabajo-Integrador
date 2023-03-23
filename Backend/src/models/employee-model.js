const connection = require('../config/db-config');

const findAllEmployee = async (whereQuery) => {
    const completeQuery = `SELECT * FROM employees e WHERE 1${whereQuery}`
    const rows = await connection.query(completeQuery).spread((rows) => rows);
    return rows;
};

const findPaginatedEmployees = async (items, offset) => {
    const rows = await connection.query(`SELECT * FROM employees a LIMIT ${items} OFFSET ${offset}`).spread((rows) => rows);
    return rows;
};

const findEmployeeById = async (id) => {
    const row = await connection.query(`SELECT * FROM employees e WHERE id = ${id}`).spread((rows) => rows);
    return row;
};

const createEmployee = async (values) => {
    const { 
        first_name,
        last_name,
        cuit,
        team_id,
        join_date,
        rol 
    } = values;

    const result = await connection.query("INSERT INTO employees (first_name, last_name, cuit, team_id, join_date, rol) values (?, ?, ?, ?, ?, ?)", 
    [first_name,
    last_name,
    cuit,
    team_id,
    join_date,
    rol]);

    return result[0].insertId;
};
const updateEmployee = async (employee, id) => {
    const { first_name, last_name, cuit, team_id, join_date, rol} = employee;
    const result = await connection.query("UPDATE employees SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE id=?",
    [
        first_name,
        last_name,
        cuit,
        team_id,
        join_date,
        rol,
        id
    ]);
    return result[0].affectedRows;
};
const deleteEmployee = async (id) => {
    const result = await connection.query(`DELETE FROM employees WHERE id = ${id}`);
    return result[0].affectedRows;
};

module.exports = {
    findAllEmployee: findAllEmployee,
    findPaginatedEmployees: findPaginatedEmployees,
    findEmployeeById: findEmployeeById,
    createEmployee: createEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee
}