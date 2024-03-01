import React from 'react'
import{Routes,Route} from 'react-router-dom'
import CreateVehicle from './pages/CreateVehicle'
import UpdateVehicle from './pages/UpdateVehicle'
import DeleteVehicle from './pages/DeleteVehicle'
import GetVehicle from './pages/GetVehicle'
function App() {
  return (
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
     <Route path="/vehicle" element={<Vehicle />} />
     <Route path="/vehicle/:id" element={<Vehicle />} />
     <Route path="/vehicle/:id/edit" element={<VehicleEdit />} />
     <Route path="/vehicle/:id/delete" element={<VehicleDelete />} />
     <Route path="/vehicle/:id/view" element={<VehicleView />} />
     <Route path="/vehicle/:id/view/edit" element={<VehicleViewEdit />} />
     <Route path="/vehicle/:id/view/delete" element={<VehicleViewDelete />} />
   </Routes>
  )
}

export default App