export const getAllEmployees = async () => {
    const url = 'http://localhost:5000/api/employees';
    const response = await fetch(url);
    const dataResponse = await response.json();
    console.log('datos: ',dataResponse);
    return dataResponse.data;
};

export const getEmployeeById = async (id) => {
    const url = `http://localhost:5000/api/employees/${id}`;
    const response = await fetch(url);
    const dataResponse = await response.json();
    return dataResponse.data;
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
    console.log('dispara');
    const response = await fetch(url, {
        method: 'DELETE'
    });
    const dataResponse = await response.json();
    return dataResponse.data;
};