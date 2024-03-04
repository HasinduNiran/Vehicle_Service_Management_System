import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import {Route, Routes} from 'react-router-dom';

import Home from './assets/pages/Home';

import ShowAllBooking from './assets/pages/Booking/ShowAllBooking';
import CreateBooking from './assets/pages/Booking/CreateBooking';
import EditBooking from './assets/pages/Booking/EditBooking';



import ShowPayment from './assets/pages/Payment/ShowPayment';
import CreatePayments from './assets/pages/Payment/CreatePayments';
import ReadOnePayment from './assets/pages/Payment/ReadOnePayment';
//import UpdatePayment from './assets/pages/Payment/EditPayment';
import DeletePayment from './assets/pages/Payment/DeletePayment';
import EditPayment from './assets/pages/Payment/EditPayment';




import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';




import ShowVehicle from './assets/pages/Vehicle/ShowVehicle'
import CreateVehicle from './assets/pages/Vehicle/CreateVehicle'
import EditVehicle from './assets/pages/Vehicle/EditVehicle'
import ReadOneVehicle from './assets/pages/Vehicle/ReadOneVehicle'
import DeleteVehicle from './assets/pages/Vehicle/DeleteVehicle'

import ShowAllFeedback from './assets/pages/Feedback/ShowAllFeedback';
import CreateFeedback from './assets/pages/Feedback//CreateFeedback';
import EditFeedbck from './assets/pages/Feedback/EditFeedbck';
import DeleteFeedback from './assets/pages/Feedback/DeleteFeedback';
import ReadOneFeedback from './assets/pages/Feedback/ReadOneFeedback';

const App = () => {
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
    

    <Route path='/employees/allEmployee' element={<ShowEmployee/>}></Route>
    <Route path='/employees/create' element={<CreateEmployee/>}></Route>
    <Route path='/employees/delete/:id' element={<DeleteEmployee/>}></Route>
    <Route path='/employees/edit/:id' element={<EditEmployee/>}></Route>
    <Route path='/employees/details/:id' element={<ReadOneEmployee/>}></Route>
    
    <Route path = '/payments/show' element={<ShowPayment/>}></Route>
    <Route path = '/payments/detail/:id' element={<ReadOnePayment/>}></Route>
    <Route path = '/payments/create' element={<CreatePayments/>}></Route>
    <Route path = '/payments/edit/:id' element={<EditPayment/>}></Route>
    <Route path = '/payments/delete/:id' element={<DeletePayment/>}></Route>

    <Route path='/feedback' element={<ShowAllFeedback/>}></Route>
    <Route path='/feedback/create' element={<CreateFeedback/>}></Route>
    <Route path='/feedback/edit/:id' element={<EditFeedbck/>}></Route>
    <Route path='/feedback/delete/:id' element={<DeleteFeedback/>}></Route>
    <Route path='/feedback/get/:id' element={<ReadOneFeedback/>}></Route>

    </Routes>  
     

  )
}

export default App