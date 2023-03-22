import { Alert, Snackbar, Stack} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateSliceChange } from '../../utils/validate';
import { nuevoEmpleado, reemplazarEmpleado } from '../../store/empleadosSlice/slice';
import { Header } from '../common/Header';
import Formulario from '../formulario';

const Create = (props) => {
    // ======= HOOOKS ===========
    const [empleado , setEmpleado] = useState({});
    const [alert , setAlert] = useState({type:'success'});
    const {idNuevo} = useSelector(state => state.idNuevo);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setearTextFields();
    }, [])
    
    // ======= FUNCTIONS ===========
    const screenConfig = () =>{
        const config = {
            title: `Mostrando Empleado: ${idNuevo}`,
            empleado: empleado,
            primaryButton: primaryButton,
            secondaryButton: secondaryButton,
            onChangeField: onChangeField,
            getValueTF: getValueTF,
            onBlurField: onBlurField,
            editable: true,
            textSecondaryButton: 'Volver',
            textPrimaryButton: 'Guardar'
            };
        return config;
    }

    //FUCION PARA EL BOTON AZUL, FUNCIONA SEGUN EL 'MODO' DEL FORMULARIO
    const primaryButton = () => {
        if(alert.type === 'success'){
            setAlert({open: true, 
                    message: `Se creo el empleado ${empleado.nombre} correctamente`,
                    type: 'success'});
            setTimeout(() => {
                navigate('/');
                dispatch(nuevoEmpleado(empleado));
            }, 3000);
        }
    }

    const secondaryButton = () => {
        setearTextFields();
    };

    const setearTextFields = () => {
        const empleadoVacio = {
                        id: idNuevo,
                        nombre: '', 
                        apellido: '',
                        email: '',
                        telefono: '',
                        fecha_contrato: '',
                        salario: '',
                        comision: ''
                        }
        setEmpleado(empleadoVacio);
    }

    //FUNCION ONCLOSE PARA CERRAR EL ALERT AUTOMATICA O MANUALMENTE
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

    // ======= PRESETS ===========

    // ======= RENDER ===========
    if(idNuevo){
        return (
            <>
                <Header/>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {mostrarMensaje()}
                </Stack>
                <Formulario config={screenConfig()} />
            </>
        );
    }   
}

export default Create;