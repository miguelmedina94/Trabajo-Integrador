import { AssetDTO } from "../DTO/assetDTO";
import { EmployeeDTO } from "../DTO/employeeDTO";


export const getAllEmployees = async (items, page) => {
    try {
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
    } catch (error) {
        throw error
    }
    
};

export const getEmployeeById = async (id) => {
    try {
        const url = `http://localhost:5000/api/employees/${id}`;
        const response = await fetch(url);
        const dataResponse = await response.json();
        const employeeDTO = new EmployeeDTO(dataResponse.data);
        return employeeDTO;
    } catch (error) {
        throw error
    }
};

export const updateEmployeeService = async (employee) => {
    try {
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
        return dataResponse;
    } catch (error) {
        throw error
    }
    
};

export const deleteEmployeeService = async (id) => {
    try {
        const url = `http://localhost:5000/api/employees/${id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const dataResponse = await response.json();
        return dataResponse.data;
    } catch (error) {
        throw error
    }
};

export const createEmployeeService = async (employee) => {
    try {
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
    } catch (error) {
        throw error
    }
};

export const getAssetsByEmployeeId = async (id) => {
    try {
        const url = `http://localhost:5000/api/assets/employeeId/${id}`;
        const response = await fetch(url);
        const dataResponse = await response.json();
        const assetsList = dataResponse.data;
        const assets = [];
        assetsList.forEach(actAsset => {
            const assetDTO = new AssetDTO(actAsset);
            assets.push(assetDTO);
        });
        return assets;
    } catch (error) {
        throw error
    }
    
};