import React from 'react';
import { Box, Button,Container,Paper, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Formulario = ({config}) => {
    // ======= HOOOKS ===========

    // ======= FUNCTIONS ===========
    
    // ======= PRESETS ===========
    //FUNCION QUE ENTREGA LOS TEXTFIELDS PERSONALIZADOS
    const customTextField = (name) =>{
        const label = name[0].toUpperCase() + name.substring(1).replace('_',' ');
        if(name === 'join_date'){
            return (
                <TextField  name={name}
                required
                disabled={!config.editable} 
                value={config.getValueTF(name)} 
                label={label}
                type={'date'}
                InputLabelProps={{shrink: true}} 
                onChange={config.onChangeField}
                onBlur={config.onBlurField}
                sx={{margin: '20px'}}
                />
            );
        }else{
            const req = name === 'first_name' || name === 'last_name' || name === 'cuit' ? true : false;
            return (
                <TextField  name={name}
                disabled={!config.editable} 
                value={config.getValueTF(name)} 
                label={label}
                onChange={config.onChangeField}
                onBlur={config.onBlurField}
                required={req}
                sx={{margin: '20px'}}
                />
            );
        };
    };
    
    // ======= RENDER ===========
    if(config.empleado){
        return (
            <Paper>
                <Box elevation={6} sx={{padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant='h5'>
                        {config.title}
                    </Typography>
                    <Box sx={{maxWidth: '600px'}}>
                        {customTextField('first_name')}
                        {customTextField('last_name')}
                        {customTextField('cuit')}
                        {customTextField('team_id')}
                        {customTextField('join_date')}
                        {customTextField('rol')}
                    </Box>
                    <Container sx={{width: '100%',display: 'flex', justifyContent: 'center', margin: '20px'}}>
                        <Button variant='contained' onClick={config.primaryButton} sx={{marginRight: '10px'}}>
                            {config.textPrimaryButton}
                        </Button>
                        <Button variant='contained' onClick={config.secondaryButton} sx={{marginLeft: '10px', bgcolor: '#64748B'}}>
                            {config.textSecondaryButton}
                        </Button>
                    </Container>
                </Box>
                {config.assets && <DataGrid
                    rows={config.assets}
                    columns={config.columns}
                    autoHeight={true}
                    pageSize={config.pageSize}
                    rowsPerPageOptions={[3,5,10,15]}
                    onPageSizeChange={(newSize) => {
                        config.changeSize(newSize);
                    }}
                    onFilterModelChange={config.handleFilterChange}
                    getRowId={(row) => row.id}
                    disableSelectionOnClick
                    onRowClick={config.goEdit}
                />
                }
            </Paper>
        );
    }
}

export default Formulario;