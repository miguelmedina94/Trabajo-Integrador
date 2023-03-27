import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Container} from '@mui/material'

import Employees from './components/screens/employees';
import Assets from './components/screens/assets';

const App = () => {
    return (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route path='/employees/*' element={<Employees/>}/>
                <Route path='/assets/*' element={<Assets/>}/>
            </Routes>
        </Container>
    </BrowserRouter>
    )
};

export default App;