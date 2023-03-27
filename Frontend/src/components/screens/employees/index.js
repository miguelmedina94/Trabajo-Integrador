import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Lista from './Home';
import Create from './Create'
import ShowEdit from './ShowEdit';

const Employees = () => {
    return (
        <Routes>
            <Route path='/' element={<Lista/>}/>
            <Route path='/new' element={<Create/>}/>
            <Route path='/edit/:id' element={<ShowEdit mode={'edit'}/>}/>
            <Route path='/show/:id' element={<ShowEdit mode={'show'}/>}/>
        </Routes>
    )
};

export default Employees;