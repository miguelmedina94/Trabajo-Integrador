const queryAsset = (queryParams) => {
    const { 
        name, 
        type, 
        code, 
        description, 
        purchase_date, 
        employee_id,
        items,
        page
        } = queryParams;
    let response = '';
    if(name){
        response = response.concat(` AND name LIKE '${name}%'`)
    }
    if(type){
        response = response.concat(` AND type LIKE '${type}%'`)
    }
    if(code){
        response = response.concat(` AND code LIKE '${code}%'`)
    }
    if(description){
        response = response.concat(` AND description LIKE '${description}%'`)
    }
    if(purchase_date){
        response = response.concat(` AND purchase_date LIKE '${purchase_date}%'`)
    }
    if(employee_id){
        response = response.concat(` AND employee_id LIKE '${employee_id}%'`)
    }
    if(items){
        response = response.concat(` LIMIT ${items}`)
    }
    if(page){
        let offset;
        if(page === 0){
            offset = page;
        }else{
            offset = (page)*items;
        }
        response = response.concat(` OFFSET ${offset}`)
    }
    return response;
};

module.exports = queryAsset;