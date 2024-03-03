import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import {Route, Routes} from 'react-router-dom';

import Home from './assets/pages/Home';

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

const App = () => {
  return (

    <Routes>

    <Route path='/' element={<Home/>}></Route>


    <Route path='/vehicle' element={<ShowVehicle/>}/>
    <Route path='/vehicle/create' element={<CreateVehicle/>}/>
    <Route path='/vehicle/edit/:id' element={<EditVehicle/>}/>
    <Route path='/vehicle/get/:id' element={<ReadOneVehicle/>}/>
    <Route path='/vehicle/delete/:id' element={<DeleteVehicle/>}/>

  
    

    <Route path='/employees/allEmployee' element={<ShowEmployee/>}></Route>
    <Route path='/employees/create' element={<CreateEmployee/>}></Route>
    <Route path='/employees/delete/:id' element={<DeleteEmployee/>}></Route>
    <Route path='/employees/edit/:id' element={<EditEmployee/>}></Route>
    <Route path='/employees/details/:id' element={<ReadOneEmployee/>}></Route>
    

    <Route path='/package' element={<ShowPackage/>}></Route>
    <Route path='/package/create' element={<CreatePackage/>}></Route>
    <Route path='/package/edit/:id' element={<EditPackage/>}></Route>
    <Route path='/package/get/:id' element={<ReadOnePackage/>}></Route>
    <Route path='/package/delete/:id' element={<DeletePackage/>}></Route>


    </Routes>  
     
      
  )
}

export default App