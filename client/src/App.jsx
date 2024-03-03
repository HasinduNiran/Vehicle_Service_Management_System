import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Route, Routes} from 'react-router-dom';

import React from 'react'
import ShowAllBooking from './assets/pages/Booking/ShowAllBooking';
import CreateBooking from './assets/pages/Booking/CreateBooking';
import EditBooking from './assets/pages/Booking/EditBooking';

function App() {
  return (
  <Routes>
    <Route path ='/show-all'  element={<ShowAllBooking/>}/>
    <Route path='/create' element={<CreateBooking/>}/>
    <Route path='/edit/:id' element={<EditBooking/>}/>


  </Routes>
  )
}

export default App
