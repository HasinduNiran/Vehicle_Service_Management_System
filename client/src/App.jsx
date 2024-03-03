import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Route, Routes} from 'react-router-dom';

import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';

import React from 'react'

function App() {
  return (
  <Routes>
    <Route path='/' element={<ShowEmployee/>}></Route>
    <Route path='/employees/create' element={<CreateEmployee/>}></Route>
    <Route path='/employees/delete/:id' element={<DeleteEmployee/>}></Route>
    <Route path='/employees/edit/:id' element={<EditEmployee/>}></Route>
    <Route path='/employees/details/:id' element={<ReadOneEmployee/>}></Route>
    

  </Routes>
  )
}

export default App
