import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Route, Routes} from 'react-router-dom';

import React from 'react'
import Home from './assets/pages/Payment/Home';
import ShowPayment from './assets/pages/Payment/ShowPayment';
import CreatePayments from './assets/pages/Payment/CreatePayments';
import ReadOnePayment from './assets/pages/Payment/ReadOnePayment';
//import UpdatePayment from './assets/pages/Payment/EditPayment';
import DeletePayment from './assets/pages/Payment/DeletePayment';
import EditPayment from './assets/pages/Payment/EditPayment';

const App=()=>{
  return (
  <Routes>
   
    <Route path = '/payments/show' element={<ShowPayment/>}></Route>
    <Route path = '/payments/detail/:id' element={<ReadOnePayment/>}></Route>
    <Route path = '/payments/create' element={<CreatePayments/>}></Route>
    <Route path = '/payments/edit/:id' element={<EditPayment/>}></Route>
    <Route path = '/payments/delete/:id' element={<DeletePayment/>}></Route>
  </Routes>
  )
}

export default App
