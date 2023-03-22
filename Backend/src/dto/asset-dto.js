class AssetDTO {
    constructor({ name, type, code, description, purchase_date, employee_id }) {
        this.name = name
        this.type =type
        this.code = code
        this.description = description
        this.purchase_date = purchase_date
        this.employee_id = employee_id
    }
}

module.exports = AssetDTO