import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Fab, Modal, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PersonAddAlt1, PersonRemove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, getEmployees } from '../../../store/empleadosSlice/slice';
import { Header } from '../../common/Header';
import { Box } from '@mui/system';

const Lista = () => {
    // ======= HOOOKS ===========
    const {employees} = useSelector(state => state.employees);
    const {totalItems} = useSelector(state => state.employees);
    const [deleteList, setDeleteList] = useState([]);
    const [pageSize, setPageSize] = useState(3);
    const [pageSelected, setPageSelected] = useState(0);
    const [filterData, setFilterData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        cargarEmpleados();
    }, [pageSelected, pageSize])
    
    // ======= FUNCTIONS ===========
    const agregarEmpleado = () =>{
        navigate('/employees/new');
    };

    const goEdit = (rowData) => {
        navigate(`/employees/show/${rowData.id}`)
    }

    const deleteSelectedList = () => {
        setShowModal(true);
    }

    const confirmDelete = () => {
        dispatch(deleteEmployee({employee: deleteList[0],pageSize}));
        setShowModal(false);
    }
    
    const cancelDelete = () => {
        setShowModal(false);
    }

    const cargarEmpleados = () => {
        dispatch(getEmployees({pageSize, pageSelected}));
    }

    const changeSize = (newSize) => {
        setPageSize(newSize);
        setPageSelected(0);
    }

    function handleFilterChange(model) {
        const {columnField, value} = model.items[0];
        setFilterData({...filterData,[columnField]: value})
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
            <Modal open={showModal} onClose={cancelDelete}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Paper sx={{ p: 2,  maxWidth: '50%',justifyContent: 'center', position: 'absolute', top: '35%'}}>
                        <Typography variant='h6'>Estas Seguro que deseas eliminar el empleado con id: {deleteList[0]} </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" onClick={cancelDelete} sx={{ mr: 2 }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={confirmDelete} sx={{ bgcolor: '#d50000' }}>
                            Eliminar
                        </Button>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
            <Header/>
            <Paper elevation={5}>
                <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center'}}>Vista Principal</Typography>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    autoHeight={true}
                    pageSize={pageSize}
                    rowsPerPageOptions={[3,5,10,15]}
                    paginationMode = 'server'
                    rowCount={totalItems}
                    onPageSizeChange={(newSize) => {
                        changeSize(newSize);
                    }}
                    onPageChange={(newPage) => {
                        setPageSelected(newPage);
                    }}
                    onFilterModelChange={handleFilterChange}
                    getRowId={(row) => row.id}
                    checkboxSelection   
                    disableSelectionOnClick
                    onRowClick={goEdit}
                    onSelectionModelChange={(selectionModel) => setDeleteList(selectionModel)}
                />
                <Fab color="primary" aria-label="add" onClick={agregarEmpleado} sx={{margin: '20px', bgcolor: '#62B6CB'}}>
                    <PersonAddAlt1 />
                </Fab>
                <Fab color="secondary" aria-label="add" onClick={deleteSelectedList} disabled={deleteList.length === 0 ? true : false} sx={{margin: '20px', bgcolor: '#d50000'}}>
                    <PersonRemove />
                </Fab>
            </Paper>
        </>
    );
}

export default Lista;