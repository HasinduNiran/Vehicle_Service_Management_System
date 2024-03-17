import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Home from './assets/pages/Home';

import ShowAllBooking from './assets/pages/Booking/ShowAllBooking';
import CreateBooking from './assets/pages/Booking/CreateBooking';
import EditBooking from './assets/pages/Booking/EditBooking';
import DeleteBooking from './assets/pages/Booking/DeleteBooking';
import ReadOneBooking from './assets/pages/Booking/ReadOneBooking'; 


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



import ShowPackage from './assets/pages/SPackage/ShowPackage'
import CreatePackage from './assets/pages/SPackage/CreatePackage'
import EditPackage from './assets/pages/SPackage/EditPackage'
import ReadOnePackage from './assets/pages/SPackage/ReadOnePackage'
import DeletePackage from './assets/pages/SPackage/DeletePAckage'

import ShowInventory from './assets/pages/Inventory/ShowInventory'
import CreateInventory from './assets/pages/Inventory/CreateInventory'
import EditInventory from './assets/pages/Inventory/EditInventory'
import ReadOneInventory from './assets/pages/Inventory/ReadOneInventory'
import DeleteInventory from './assets/pages/Inventory/DeleteInventory'

import ShowAllFeedback from './assets/pages/Feedback/ShowAllFeedback';
import CreateFeedback from './assets/pages/Feedback//CreateFeedback';
import EditFeedback from './assets/pages/Feedback/EditFeedback';
import DeleteFeedback from './assets/pages/Feedback/DeleteFeedback';
import ReadOneFeedback from './assets/pages/Feedback/ReadOneFeedback';

import CreateCustomer from './assets/pages/Customer/CreateCustomer';
import ShowCustomer from './assets/pages/Customer/ShowCustomer';
import UpdateCustomer from './assets/pages/Customer/UpdateCustomer';
import DeleteCustomer from './assets/pages/Customer/DeleteCustomer';
import ReadOneCustomer from './assets/pages/Customer/ReadOneCustomer';

import ShowAllServiceHistory from './assets/pages/ServiceHistory/ShowAllServiceHistory';
import CreateServiceHistory from './assets/pages/ServiceHistory/CreateServiceHistory';
import EditServiceHistory from './assets/pages/ServiceHistory/EditServiceHistory';
import DeleteServiceHistory from './assets/pages/ServiceHistory/DeleteServiceHistory'; 
import ReadOneServiceHistory from './assets/pages/ServiceHistory/ReadOneServiceHistory';


import ManagerLogin from './assets/components/ManagerLogin';

const App = () => {

  return (

    <Routes>

      <Route path='/' element={<Home />}></Route>
      <Route path='/Mlogin' element={<ManagerLogin/>}></Route>

      <Route path='/vehicle' element={<ShowVehicle />} />
      <Route path='/vehicle/create' element={<CreateVehicle />} />
      <Route path='/vehicle/edit/:id' element={<EditVehicle />} />
      <Route path='/vehicle/get/:id' element={<ReadOneVehicle />} />
      <Route path='/vehicle/delete/:id' element={<DeleteVehicle />} />

      <Route path='/employees/allEmployee' element={<ShowEmployee />}></Route>
      <Route path='/employees/create' element={<CreateEmployee />}></Route>
      <Route path='/employees/delete/:id' element={<DeleteEmployee />}></Route>
      <Route path='/employees/edit/:id' element={<EditEmployee />}></Route>
      <Route path='/employees/details/:id' element={<ReadOneEmployee />}></Route>

      <Route path='/payments/show' element={<ShowPayment />}></Route>
      <Route path='/payments/detail/:id' element={<ReadOnePayment />}></Route>
      <Route path='/payments/create' element={<CreatePayments />}></Route>
      <Route path='/payments/edit/:id' element={<EditPayment />}></Route>
      <Route path='/payments/delete/:id' element={<DeletePayment />}></Route>


    <Route path ='/show-all'  element={<ShowAllBooking/>}/>
    <Route path='/create' element={<CreateBooking/>}/>
    <Route path='/edit/:id' element={<EditBooking/>}/>
    <Route path='booking/delete/:id' element={<DeleteBooking/>}/>
    <Route path='booking/read/:id' element={<ReadOneBooking/>}/>

      <Route path='/inventory/allInventory' element={<ShowInventory />}></Route>
      <Route path='/inventory/create' element={<CreateInventory />}></Route>
      <Route path='/inventory/edit/:id' element={<EditInventory />}></Route>
      <Route path='/inventory/delete/:id' element={<DeleteInventory />}></Route>
      <Route path='/inventory/get/:id' element={<ReadOneInventory />}></Route>

   



    <Route path='/package' element={<ShowPackage/>}></Route>
    <Route path='/package/create' element={<CreatePackage/>}></Route>
    <Route path='/package/edit/:id' element={<EditPackage/>}></Route>
    <Route path='/package/get/:id' element={<ReadOnePackage/>}></Route>
    <Route path='/package/delete/:id' element={<DeletePackage/>}></Route>

    <Route path ='/show-all'  element={<ShowAllBooking/>}/>
    <Route path='/create' element={<CreateBooking/>}/>
    <Route path='/edit/:id' element={<EditBooking/>}/>



    <Route path='/feedback' element={<ShowAllFeedback/>}></Route>
    <Route path='/feedback/create' element={<CreateFeedback/>}></Route>
    <Route path='/feedback/edit/:id' element={<EditFeedback/>}></Route>
    <Route path='/feedback/delete/:id' element={<DeleteFeedback/>}></Route>
    <Route path='/feedback/get/:id' element={<ReadOneFeedback/>}></Route>


    <Route path='/customer/allCustomer' element={<ShowCustomer/>}></Route>
    <Route path='/customer/create' element={<CreateCustomer/>}></Route>
    <Route path='/customer/edit/:id' element={<UpdateCustomer/>}></Route>
    <Route path='/customer/delete/:id' element={<DeleteCustomer/>}></Route>
    <Route path='/customer/get/:id' element={<ReadOneCustomer/>}></Route>

    <Route path='/ServiceHistory' element={<ShowAllServiceHistory/>}></Route>
    <Route path='/ServiceHistory/create' element={<CreateServiceHistory/>}></Route>
    <Route path='/ServiceHistory/edit/:id' element={<EditServiceHistory/>}></Route>
    <Route path='/ServiceHistory/delete/:id' element={<DeleteServiceHistory/>}></Route>
    <Route path='/ServiceHistory/get/:id' element={<ReadOneServiceHistory/>}></Route>
  

    </Routes>  


  )
}

export default App