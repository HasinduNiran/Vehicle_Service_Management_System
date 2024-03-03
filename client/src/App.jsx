import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ShowVehicle from './assets/pages/Vehicle/ShowVehicle'
import CreateVehicle from './assets/pages/Vehicle/CreateVehicle'
import EditVehicle from './assets/pages/Vehicle/EditVehicle'
import ReadOneVehicle from './assets/pages/Vehicle/ReadOneVehicle'
import DeleteVehicle from './assets/pages/Vehicle/DeleteVehicle'
const App = () => {
  return (
    <Routes>

    <Route path='/' element={<ShowVehicle/>}/>
    <Route path='/vehicle/create' element={<CreateVehicle/>}/>
    <Route path='/vehicle/edit/:id' element={<EditVehicle/>}/>
    <Route path='/vehicle/get/:id' element={<ReadOneVehicle/>}/>
    <Route path='/vehicle/delete/:id' element={<DeleteVehicle/>}/>

    </Routes>  
     
      
  )
}

export default App