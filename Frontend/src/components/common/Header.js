import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Header = () => {
    // ============= HOOKS ===============
    const navigate = useNavigate();
    const [show , setShow] = useState(false);
    const [rute, setRute] = useState('');
    const [text, setText] = useState('');
    
    // ============= FUNCTIONS ============
    const showModalHome = () => {
        setText('¿Desea ir a la vista Principal?');
        setRute('/employees');
        setShow(true);
    }

    const showModalAssets = () => {
        setText('¿Desea ir a la Lista de Assets?');
        setRute('/assets');
        setShow(true);
    }

    // ============= PRESETS ==============
    // ============= RENDER  ==============
    return (
        <>
            <Modal open={show} container={document.body} onClose={() => setShow(false)}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Paper elevation={3} sx={{position: 'absolute', maxWidth: '50%', padding: ' 10px', top: '35%'}}>
                    <Typography variant='h6' sx={{margin: '10px'}}>
                        {text}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button 
                        variant='contained'
                        onClick={() => {
                            setShow(false)
                            navigate(rute)}}
                        sx={{marginRight:'10px'}}
                        >
                            Aceptar
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
            <Button onClick={showModalHome} variant='contained' sx={{margin: '10px', bgcolor:'#62B6CB'}}>
                <HomeIcon />
                <Typography>
                    Home
                </Typography>
            </Button>
            <Button onClick={showModalAssets} variant='contained' sx={{margin: '10px', bgcolor:'#62B6CB'}}>
                <HomeIcon />
                <Typography>
                    Assets
                </Typography>
            </Button>
        </>
    );
};