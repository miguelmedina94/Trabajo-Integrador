import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Container} from '@mui/material'

import Lista from './components/screens/Home';
import Create from './components/screens/Create'
import ShowEdit from './components/screens/ShowEdit';

const App = () => {
    return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path='/' element={<Lista/>}/>
                <Route path='/new' element={<Create/>}/>
                <Route path='/edit/:id' element={<ShowEdit mode={'edit'}/>}/>
                <Route path='/show/:id' element={<ShowEdit mode={'show'}/>}/>
            </Routes>
        </Container>
    </BrowserRouter>
    )
};

export default App;