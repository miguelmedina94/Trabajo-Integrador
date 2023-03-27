//FUNCION PARA VALIDAD LOS CAMPOS SI ESTAN LLENOS Y QUE NO GUARDE EN ESE CASO
export const validateSliceChange = (asset,e) => {
    const error = {type: 'success'};
        if ((asset.name === '' || !isNaN(e.target.value)) && e.target.name === 'name'){
            error.message = `El campo nombre esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if ((asset.type === '' || !isNaN(e.target.value))  && e.target.name === 'type'){
            error.message = `El campo tipo esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if ((asset.description === '' || isNaN(e.target.value))   && e.target.name === 'description'){
            error.message = `El campo descripcion esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if (asset.purchase_date === '' && e.target.name === 'purchase_date'){
            error.message = `El campo fecha de compra esta vacio`;
            error.open = true;
            error.type = 'error'
        }
    return error;
}