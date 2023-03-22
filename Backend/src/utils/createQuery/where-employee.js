const queryEmployee = (queryParams) => {
    const { 
        first_name, 
        last_name, 
        cuit, 
        team_id, 
        join_date, 
        rol,
        items,
        page
        } = queryParams;
    let response = '';
    if(first_name){
        response = response.concat(` AND first_name LIKE '${first_name}%'`)
    }
    if(last_name){
        response = response.concat(` AND last_name LIKE '${last_name}%'`)
    }
    if(cuit){
        response = response.concat(` AND cuit LIKE '${cuit}%'`)
    }
    if(team_id){
        response = response.concat(` AND team_id LIKE '${team_id}%'`)
    }
    if(join_date){
        response = response.concat(` AND join_date LIKE '${join_date}%'`)
    }
    if(rol){
        response = response.concat(` AND rol LIKE '${rol}%'`)
    }
    
    if(items){
        response = response.concat(` LIMIT ${items}`)
    }
    if(page){
        let offset;
        if(page === 1){
            offset = 0;
        }else{
            offset = (page-1)*items;
        }
        response = response.concat(` OFFSET ${offset}`)
    }
    return response;
};

module.exports = queryEmployee;