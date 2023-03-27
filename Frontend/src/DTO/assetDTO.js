import  { format } from 'date-fns';

export class AssetDTO {
    constructor ({id, name, type, code, description, purchase_date, employee_id }){
        const date = new Date(purchase_date);
        const formatedDate = format(date, 'yyyy-MM-dd');
        this.id = id;
        this.name = name;
        this.type = type;
        this.code = code;
        this.description = description;
        this.purchase_date = formatedDate;
        this.employee_id = employee_id;
    }
}
