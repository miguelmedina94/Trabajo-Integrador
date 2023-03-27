import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert,Snackbar } from '@mui/material';
import { Stack } from '@mui/system';

import { updateAsset } from '../../../store/assetsSlice/slice';
import { validateSliceChange } from '../../../utils/validateAsset';
import Formulario from '../../formulario/assets';
import { getAssetById } from '../../../services/assetHttpServices';

const ShowEdit = ( props ) => {
    // ======= HOOOKS ===========
    const {id} = useParams();
    const [mode , setMode] = useState(props.mode);
    const [alert , setAlert] = useState({type:'success'});
    const [editable, setEditable] = useState();
    const [asset, setAsset] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() =>{
        setearAsset();
    },[mode])
    
    // ======= FUNCTIONS ===========
    const screenConfig = () =>{
        const config = {
            asset: asset,
            primaryButton: primaryButton,
            secondaryButton: secondaryButton,
            onChangeField: onChangeField,
            getValueTF: getValueTF,
            onBlurField: onBlurField
            };
        switch (mode) {
            case 'show':
                config.title = `Mostrando Asset: ${id}`;
                config.editable = false;
                config.textPrimaryButton = 'Editar'
                config.textSecondaryButton = 'Volver';
                break;
            case 'edit':
                config.title = `Editando Asset: ${id}`;
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
                    dispatch(updateAsset(asset));
                    setEditable(!editable);
                    setMode('show');
                    setAlert({open: true, 
                        message: `Se modifico el asset ${asset.name} correctamente`,
                        type: 'success'});
                }
                break;
            case 'show':
                setEditable(!editable);
                setMode('edit');
                setAlert({type: 'success'});
                break;
            default:
                return;
        }
    }

    const secondaryButton = () => {
        switch (mode) {
            case 'edit':
                setMode('show');
                setearAsset();
                setEditable(false);
                break;
            case 'show':
                navigate('/assets');
                break;
            default:
                return;
        };
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

    // ======= PRESETS ===========
    const setearAsset = async () => {
        const assetSeleccionado = await getAssetById(id);
        setAsset(assetSeleccionado);
    }

    // ======= RENDER ===========
    if(screenConfig().asset){
        return (
            <>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {mostrarMensaje()}
                </Stack>
                <Formulario config={screenConfig()}/>
            </>
        );
    }else{
        // return assetNotFound();
    }
}

export default ShowEdit;