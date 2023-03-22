import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, Divider, Paper, Snackbar } from '@mui/material';
import { Stack } from '@mui/system';

import { reemplazarEmpleado } from '../../store/empleadosSlice/slice';
import { validateSliceChange } from '../../utils/validate';
import Formulario from '../formulario';
import imagen from '../../media/alert.png'

const ShowEdit = ( props ) => {
    // ======= HOOOKS ===========
    const {id} = useParams();
    const {empleados} = useSelector(state => state.empleados);
    const [mode , setMode] = useState(props.mode);
    const [alert , setAlert] = useState({type:'success'});
    const [editable, setEditable] = useState();
    const [empleado, setEmpleado] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() =>{
        setearEmpleado();
    },[mode])
    
    // ======= FUNCTIONS ===========
    const screenConfig = () =>{
        const config = {
            empleado: empleado,
            primaryButton: primaryButton,
            secondaryButton: secondaryButton,
            onChangeField: onChangeField,
            getValueTF: getValueTF,
            onBlurField: onBlurField
            };
        switch (mode) {
            case 'show':
                config.title = `Mostrando Empleado: ${id}`;
                config.editable = false;
                config.textPrimaryButton = 'Editar'
                config.textSecondaryButton = 'Volver';
                break;
            case 'edit':
                config.title = `Editando Empleado: ${id}`;
                config.editable = true;
                config.textPrimaryButton = 'Guardar'
                config.textSecondaryButton = 'Cancelar';
                break;
            default:
                return;
        }
        return config;
    }

    const primaryButton = () =>{
        switch (mode){
            case 'edit':
                if(alert.type === 'success'){
                    dispatch(reemplazarEmpleado(empleado));
                    setEditable(!editable);
                    setMode('show');
                    setAlert({open: true, 
                        message: `Se modifico el empleado ${empleado.nombre} correctamente`,
                        type: 'success'});
                }
                break;
            case 'show':
                setEditable(!editable);
                setMode('edit');
                break;
            default:
                return;
        }
    }

    const secondaryButton = () => {
        switch (mode) {
            case 'edit':
                setMode('show');
                setearEmpleado();
                setEditable(false);
                break;
            case 'show':
                navigate('/');
                break;
        };
    };

    const onChangeField = (e) => {
        const value = e.target.value;
        setEmpleado({
            ...empleado,
            [e.target.name]: value
        });
    };

    const getValueTF = (attr) =>{
        return empleado[attr] ? empleado[attr] : '';
    }

    const onBlurField = (e) => {
        setAlert(validateSliceChange(empleado,e));
    }

    const onClose = (event,reason) => {
        if (reason !== 'clickaway') {
            setAlert({open: false});
        }
    };

    const mostrarMensaje = () => {
        return (
                <Snackbar open={alert.open} autoHideDuration={3000} onClose={onClose}>
                    <Alert onClose={onClose} severity={alert.type} sx={{ width: '100%'}}>
                    {alert.message}
                    </Alert>
                </Snackbar>
        );
    };

    const empleadoNotFound = () => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
        return(
            <Paper sx={{maxWidth: '500px'}}>
            <Divider />
                <Alert severity='error'> NO SE ENCONTRO EL EMPLEADO</Alert>
                <img src={imagen} alt='error' width={500}/>
            <Divider />
        </Paper>
        )
    }

    // ======= PRESETS ===========
    const setearEmpleado = () => {
        const empleadoSeleccionado = empleados.find( actual => actual.id === id);
        setEmpleado(empleadoSeleccionado);
    }

    // ======= RENDER ===========
    if(screenConfig().empleado){
        return (
            <>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {mostrarMensaje()}
                </Stack>
                <Formulario config={screenConfig()}/>
            </>
        );
    }else{
        return empleadoNotFound();
    }
}

export default ShowEdit;