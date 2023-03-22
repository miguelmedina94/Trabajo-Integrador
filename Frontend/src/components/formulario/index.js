import React from 'react';
import { Button,Container,Paper, TextField, Typography } from '@mui/material';

const Formulario = ({config}) => {
    // ======= HOOOKS ===========

    // ======= FUNCTIONS ===========
    
    // ======= PRESETS ===========
    //FUNCION QUE ENTREGA LOS TEXTFIELDS PERSONALIZADOS
    const customTextField = (name) =>{
        const label = name[0].toUpperCase() + name.substring(1).replace('_',' de ');
        if(name === 'fecha_contrato'){
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
            const req = name === 'nombre' || name === 'apellido' || name === 'telefono' ? true : false;
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
            <Paper elevation={6} sx={{padding: '10px', maxWidth: '600px'}}>
                <Typography variant='h5'>
                    {config.title}
                </Typography>
                {customTextField('nombre')}
                {customTextField('apellido')}
                {customTextField('email')}
                {customTextField('telefono')}
                {customTextField('salario')}
                {customTextField('comision')}
                {customTextField('fecha_contrato')}
                <Container sx={{width: '100%',display: 'flex', justifyContent: 'flex-end', margin: '20px'}}>
                    <Button variant='contained' onClick={config.primaryButton} sx={{marginRight: '10px'}}>
                        {config.textPrimaryButton}
                    </Button>
                    <Button variant='contained' onClick={config.secondaryButton} sx={{marginLeft: '10px', bgcolor: '#64748B'}}>
                        {config.textSecondaryButton}
                    </Button>
                </Container>
            </Paper>
        );
    }
}

export default Formulario;