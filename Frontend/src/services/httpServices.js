export const getAllEmployees = async () => {
    const url = 'http://localhost:5000/api/employees';
    const response = await fetch(url);
    const dataResponse = await response.json();
    console.log('datos: ',dataResponse);
    return dataResponse.data;
}

export const getEmployeeById = async (id) => {
    const url = `http://localhost:5000/api/employees/${id}`;
    const response = await fetch(url);
    const dataResponse = await response.json();
    return dataResponse.data;
}

export const updateEmployeeById = async (employee) => {
    console.log(employee);
    const {id, first_name, last_name, cuit, team_id, join_date, rol} = employee;
    const url = `http://localhost:5000/api/employees/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
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
}