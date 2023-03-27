import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert,Snackbar } from '@mui/material';
import { Stack } from '@mui/system';

import { updateEmployee } from '../../../store/empleadosSlice/slice';
import { validateSliceChange } from '../../../utils/validateEmployee';
import Formulario from '../../formulario/employees';
import { getEmployeeById, getAssetsByEmployeeId } from '../../../services/employeeHttpServices';
import { Header } from '../../common/Header';

const ShowEdit = ( props ) => {
    // ======= HOOOKS ===========
    const {id} = useParams();
    const [mode , setMode] = useState(props.mode);
    const [alert , setAlert] = useState({type:'success'});
    const [editable, setEditable] = useState();
    const [empleado, setEmpleado] = useState(null);
    const [assets, setAssets] = useState([]);
    const [pageSize, setPageSize] = useState(3);

    
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
            onBlurField: onBlurField,
            pageSize: pageSize,
            changeSize: changeSize,
            assets: assets,
            columns: columns,
            goEdit: goEdit
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
                    dispatch(updateEmployee(empleado));
                    setEditable(!editable);
                    setMode('show');
                    setAlert({open: true, 
                        message: `Se modifico el empleado ${empleado.first_name} correctamente`,
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
                setearEmpleado();
                setEditable(false);
                break;
            case 'show':
                navigate('/employees');
                break;
            default:
                return;
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

    const changeSize = (newSize) => {
        setPageSize(newSize)
    }

    const goEdit = (rowData) => {
        navigate(`/assets/show/${rowData.id}`)
    }

    const columns = [
        { field: 'id', headerName: 'ID',type: 'number', width: 70 },
        { field: 'name', headerName: 'Nombre',type: 'string', width: 130 },
        { field: 'type', headerName: 'Tipo', width: 130 },
        { field: 'code', headerName: 'Codigo/Serial', width: 130 },
        { field: 'description',headerName: 'Descripcion',width: 150},
        { field: 'purchase_date', headerName: 'Fecha de compra',type: 'date', width: 130 },
        { field: 'employee_id', headerName: 'Empleado',type: 'string', width: 130 }
    ];

    // ======= PRESETS ===========
    const setearEmpleado = async () => {
        const empleadoSeleccionado = await getEmployeeById(id);
        setEmpleado(empleadoSeleccionado);
        const employeeAssets = await getAssetsByEmployeeId(id);
        setAssets(employeeAssets);
    }

    // ======= RENDER ===========
    if(screenConfig().empleado){
        return (
            <>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {mostrarMensaje()}
                </Stack>
                <Header/>
                <Formulario config={screenConfig()}/>
            </>
        );
    }else{
        // return empleadoNotFound();
    }
}

export default ShowEdit;