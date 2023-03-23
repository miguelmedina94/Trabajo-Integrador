import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Fab, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PersonAddAlt1, PersonRemove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, getEmployees } from '../../store/empleadosSlice/slice';
import { Header } from '../common/Header';

const Lista = () => {
    // ======= HOOOKS ===========
    const {employees} = useSelector(state => state.employees)
    const [deleteList, setDeleteList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmployees());
    }, [])
    
    // ======= FUNCTIONS ===========
    const agregarEmpleado = () =>{
        navigate('/new');
    };

    const goEdit = (rowData) => {
        navigate(`/show/${rowData.id}`)
    }

    const deleteSelectedList = () => {
        dispatch(deleteEmployee(deleteList[0]))
    }

    // ======= PRESETS ===========
    //PREPARAR LAS COLUMNAS Y QUE DATOS LEERAN DEL EMPLEADOS
    const columns = [
        { field: 'id', headerName: 'ID',type: 'number', width: 70 },
        { field: 'first_name', headerName: 'Nombre',type: 'string', width: 130 },
        { field: 'last_name', headerName: 'Apellido', width: 130 },
        { field: 'cuit',headerName: 'Cuit',width: 150},
        { field: 'team_id', headerName: 'Id de equipo', width: 130 },
        { field: 'join_date', headerName: 'Fecha de entrada',type: 'date', width: 130 },
        { field: 'rol', headerName: 'Rol',type: 'string', width: 130 }
    ];
    
    // ======= RENDER ===========
    return (
        <>
            <Header/>
            <Paper sx={{ height: 350}}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.id}
                    checkboxSelection   
                    disableSelectionOnClick
                    onRowClick={goEdit}
                    onSelectionModelChange={(selectionModel) => setDeleteList(selectionModel)}
                />
                <Fab color="primary" aria-label="add" onClick={agregarEmpleado} sx={{margin: '20px', bgcolor: '#62B6CB'}}>
                    <PersonAddAlt1 />
                </Fab>
                <Fab color="secondary" aria-label="add" onClick={deleteSelectedList} sx={{margin: '20px', bgcolor: '#d50000'}}>
                    <PersonRemove />
                </Fab>
            </Paper>
        </>
    );
}

export default Lista;