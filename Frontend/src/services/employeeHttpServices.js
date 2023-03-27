import { EmployeeDTO } from "../DTO/employeeDTO";


export const getAllEmployees = async (items, page) => {
    const url = `http://localhost:5000/api/employees?items=${items}&page=${page}`;
    const response = await fetch(url);
    const dataResponse = await response.json();
    const { totalItems, employeeList } = dataResponse.data;
    const employees = [];
    employeeList.forEach(actEmployee => {
        const employeeDTO = new EmployeeDTO(actEmployee);
        employees.push(employeeDTO);
    });
    return {employees, totalItems};
};

export const getEmployeeById = async (id) => {
    const url = `http://localhost:5000/api/employees/${id}`;
    const response = await fetch(url);
    const dataResponse = await response.json();
    const employeeDTO = new EmployeeDTO(dataResponse.data);
    return employeeDTO;
};

export const updateEmployeeService = async (employee) => {
    console.log('sale de service: ',employee);
    const {id, first_name, last_name, cuit, team_id, join_date, rol} = employee;
    const url = `http://localhost:5000/api/employees/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name,
            last_name,
            cuit,
            team_id,
            join_date,
            rol
        })
    });
    const dataResponse = await response.json();
    console.log(dataResponse);
    return dataResponse;
};

export const deleteEmployeeService = async (id) => {
    const url = `http://localhost:5000/api/employees/${id}`;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    const dataResponse = await response.json();
    return dataResponse.data;
};

export const createEmployeeService = async (employee) => {
    const { first_name, last_name, cuit, team_id, join_date, rol } = employee;
    const url = `http://localhost:5000/api/employees/`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name,
            last_name,
            cuit,
            team_id,
            join_date,
            rol
        })
    });
    const dataResponse = await response.json();
    return dataResponse.data;
};