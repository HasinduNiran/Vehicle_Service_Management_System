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
import ReadOneBooking from './assets/pages/Booking/ReadOneBooking'; 

function App() {
  return (

    <Routes>

    <Route path='/' element={<Home/>}></Route>


    
    <Route path ='/show-all'  element={<ShowAllBooking/>}/>
    <Route path='/create' element={<CreateBooking/>}/>
    <Route path='/edit/:id' element={<EditBooking/>}/>
    <Route path='booking/delete/:id' element={<DeleteBooking/>}/>
    <Route path='booking/read/:id' element={<ReadOneBooking/>}/>

    </Routes>  
     

  )
}

export default App