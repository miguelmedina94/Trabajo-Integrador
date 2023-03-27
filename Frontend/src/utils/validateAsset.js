//FUNCION PARA VALIDAD LOS CAMPOS SI ESTAN LLENOS Y QUE NO GUARDE EN ESE CASO
export const validateSliceChange = (empleado,e) => {
    const error = {type: 'success'};
        if ((empleado.first_name === '' || !isNaN(e.target.value)) && e.target.name === 'first_name'){
            error.message = `El campo nombre esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if ((empleado.last_name === '' || !isNaN(e.target.value))  && e.target.name === 'last_name'){
            error.message = `El campo apellido esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if ((empleado.cuit === '' || isNaN(e.target.value))   && e.target.name === 'cuit'){
            error.message = `El campo telefono esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if (empleado.join_date === '' && e.target.name === 'join_date'){
            error.message = `El campo fecha contrato esta vacio`;
            error.open = true;
            error.type = 'error'
        }
    return error;
}