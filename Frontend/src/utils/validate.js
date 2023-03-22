//FUNCION PARA VALIDAD LOS CAMPOS SI ESTAN LLENOS Y QUE NO GUARDE EN ESE CASO
export const validateSliceChange = (empleado,e) => {
    const error = {type: 'success'};
        if (empleado.nombre === '' || !isNaN(e.target.value) && e.target.name === 'nombre'){
            error.message = `El campo nombre esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if (empleado.apellido === '' || !isNaN(e.target.value)  && e.target.name === 'apellido'){
            error.message = `El campo apellido esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if (empleado.telefono === '' || isNaN(e.target.value)   && e.target.name === 'telefono'){
            error.message = `El campo telefono esta vacio o es invalido`;
            error.open = true;
            error.type = 'error'
        }
        if (empleado.fecha_contrato === '' && e.target.name === 'fecha_contrato'){
            error.message = `El campo fecha contrato esta vacio`;
            error.open = true;
            error.type = 'error'
        }
    return error;
}