import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import {Route, Routes} from 'react-router-dom';

import Home from './assets/pages/Home';

import ShowAllBooking from './assets/pages/Booking/ShowAllBooking';
import CreateBooking from './assets/pages/Booking/CreateBooking';
import EditBooking from './assets/pages/Booking/EditBooking';
import DeleteBooking from './assets/pages/Booking/DeleteBooking';

function App() {
  return (

    <Routes>

    <Route path='/' element={<Home/>}></Route>


    <Route path='/vehicle' element={<ShowVehicle/>}/>
    <Route path='/vehicle/create' element={<CreateVehicle/>}/>
    <Route path='/vehicle/edit/:id' element={<EditVehicle/>}/>
    <Route path='/vehicle/get/:id' element={<ReadOneVehicle/>}/>
    <Route path='/vehicle/delete/:id' element={<DeleteVehicle/>}/>

    <Route path ='/show-all'  element={<ShowAllBooking/>}/>
    <Route path='/create' element={<CreateBooking/>}/>
    <Route path='/edit/:id' element={<EditBooking/>}/>
    <Route path='booking/delete/:id' element={<DeleteBooking/>}/>

    </Routes>  
     

  )
}

export default App