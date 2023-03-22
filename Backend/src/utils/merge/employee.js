const completeEmployee = (newEmployee, oldEmployee) => {
    const updatedEmployee = {...oldEmployee};

    if(newEmployee.first_name){
        updatedEmployee.first_name = newEmployee.first_name;
    }

    if(newEmployee.last_name){
        updatedEmployee.last_name = newEmployee.last_name;
    }

    if(newEmployee.cuit){
        updatedEmployee.cuit = newEmployee.cuit;
    }

    if(newEmployee.team_id){
        updatedEmployee.team_id = newEmployee.team_id;
    }

    if(newEmployee.join_date){
        updatedEmployee.join_date = newEmployee.join_date;
    }

    if(newEmployee.rol){
        updatedEmployee.rol = newEmployee.rol;
    }

    return updatedEmployee;
}

module.exports = completeEmployee;