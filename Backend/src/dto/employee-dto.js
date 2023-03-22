class EmployeeDTO {
    constructor({ first_name, last_name, cuit, team_id, join_date, rol }) {
        this.first_name = first_name
        this.last_name =last_name
        this.cuit = cuit
        this.team_id = team_id
        this.join_date = join_date
        this.rol = rol
    }
}

module.exports = EmployeeDTO