const completeAsset = (newAsset, oldAsset) => {
    const updatedAsset = {...oldAsset};

    if(newAsset.name){
        updatedAsset.name = newAsset.name;
    }

    if(newAsset.type){
        updatedAsset.type = newAsset.type;
    }

    if(newAsset.code){
        updatedAsset.code = newAsset.code;
    }

    if(newAsset.description){
        updatedAsset.description = newAsset.description;
    }

    if(newAsset.purchase_date){
        updatedAsset.purchase_date = newAsset.purchase_date;
    }
    if(newAsset.employee_id){
        updatedAsset.employee_id = newAsset.employee_id;
    }

    return updatedAsset;
}

module.exports = completeAsset;