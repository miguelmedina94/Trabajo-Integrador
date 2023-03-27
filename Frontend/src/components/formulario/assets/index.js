import React from 'react';
import { Button,Container,Paper, TextField, Typography } from '@mui/material';

const Formulario = ({config}) => {
    // console.log('configuracion: ',config);
    // ======= HOOOKS ===========

    // ======= FUNCTIONS ===========
    
    // ======= PRESETS ===========
    //FUNCION QUE ENTREGA LOS TEXTFIELDS PERSONALIZADOS
    const customTextField = (name) =>{
        const label = name[0].toUpperCase() + name.substring(1).replace('_',' ');
        if(name === 'purchase_date'){
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
            const req = name === 'name' || name === 'type' || name === 'description' ? true : false;
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
    if(config.asset){
        return (
            <Paper elevation={6} sx={{padding: '10px', maxWidth: '600px'}}>
                <Typography variant='h5'>
                    {config.title}
                </Typography>
                {customTextField('name')}
                {customTextField('type')}
                {customTextField('code')}
                {customTextField('description')}
                {customTextField('purchase_date')}
                {customTextField('employee_id')}
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