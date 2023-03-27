import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Header = () => {
    // ============= HOOKS ===============
    const navigate = useNavigate();
    const [show , setShow] = useState(false);
    
    // ============= FUNCTIONS ============
    const showModal = () => {
        setShow(true);
    }

    // ============= PRESETS ==============
    const message = '¿Desea Volver a la vista Principal?';
    const button1 = 'Volver';
    // ============= RENDER  ==============
    return (
        <>
            <Modal open={show} container={document.body} onClose={() => setShow(false)}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Paper elevation={3} sx={{position: 'absolute', maxWidth: '50%', padding: ' 10px', top: '35%'}}>
                    <Typography variant='h6' sx={{margin: '10px'}}>
                        {message}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button 
                        variant='contained'
                        onClick={() => {
                            setShow(false)
                            navigate('/')}}
                        sx={{marginRight:'10px'}}
                        >
                            {button1}
                        </Button>
                        <Button 
                        variant='contained'
                        onClick={() => {
                            setShow(false)}}
                        sx={{marginRight:'10px',bgcolor: '#64748B'}}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Paper>
                </Box>
            </Modal>
            <Button onClick={showModal} variant='contained' sx={{marginBottom: '10px', bgcolor:'#62B6CB'}}>
                <HomeIcon />
                <Typography>
                    Home
                </Typography>
            </Button>
        </>
    );
};