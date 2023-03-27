import { Alert, Snackbar, Stack} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateSliceChange } from '../../../utils/validateAsset';
import { createAsset } from '../../../store/assetsSlice/slice';
import { Header } from '../../common/Header';
import Formulario from '../../formulario/assets';

const Create = (props) => {
    // ======= HOOOKS ===========
    const [asset , setAsset] = useState({});
    const [alert , setAlert] = useState({type:'success'});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setearTextFields();
    }, [])
    
    // ======= FUNCTIONS ===========
    const screenConfig = () =>{
        const config = {
            title: `Creando Nuevo Asset`,
            asset: asset,
            primaryButton: primaryButton,
            secondaryButton: secondaryButton,
            onChangeField: onChangeField,
            getValueTF: getValueTF,
            onBlurField: onBlurField,
            editable: true,
            textSecondaryButton: 'Limpiar',
            textPrimaryButton: 'Guardar'
            };
        return config;
    }

    //FUCION PARA EL BOTON AZUL, FUNCIONA SEGUN EL 'MODO' DEL FORMULARIO
    const primaryButton = () => {
        if(alert.type === 'success'){
            setAlert({open: true, 
                    message: `Se creo el asset ${asset.name} correctamente`,
                    type: 'success'});
            setTimeout(() => {
                dispatch(createAsset(asset));
                navigate('/assets');
            }, 3000);
        }
    }

    const secondaryButton = () => {
        setearTextFields();
    };
    const setearTextFields = () => {
        const assetVacio = {
                        name: '', 
                        type: '',
                        code: '',
                        description: '',
                        purchase_date: '',
                        employee_id: null
                        }
        setAsset(assetVacio);
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
        setAsset({
            ...asset,
            [e.target.name]: value
        });
    };

    const getValueTF = (attr) =>{
        return asset[attr] ? asset[attr] : '';
    }

    const onBlurField = (e) => {
        setAlert(validateSliceChange(asset,e));
    }

    // ======= PRESETS ===========

    // ======= RENDER ===========
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

export default Create;