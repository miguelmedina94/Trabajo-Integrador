import  { format } from 'date-fns';

export class EmployeeDTO {
    constructor ({id, first_name, last_name, cuit, team_id, join_date, rol }){
        const date = new Date(join_date);
        const formatedDate = format(date, 'yyyy-MM-dd');
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.cuit = cuit;
        this.team_id = team_id;
        this.join_date = formatedDate;
        this.rol = rol;
    }
}
