import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CustomerDashboard from'./assets/pages/Customer/CustomerDashboard';
import PaymentDashboard from './assets/pages/Payment/PaymentDashboard';
import AdminCreateBooking from './assets/pages/Booking/AdminCreateBooking';

import Home from './assets/pages/Home';
import ReadOneHome from './assets/pages/ReadOneHome';

import ShowAllBooking from './assets/pages/Booking/ShowAllBooking';
import CreateBooking from './assets/pages/Booking/CreateBooking';
import EditBooking from './assets/pages/Booking/EditBooking';
import DeleteBooking from './assets/pages/Booking/DeleteBooking';
import ReadOneBooking from './assets/pages/Booking/ReadOneBooking';
import BookingDashBoard from './assets/pages/Booking/BookingDashBoard';
import AddBookingLimit from './assets/pages/Booking/AddBookingLimit';
import BookingLimitDashBoard from './assets/pages/Booking/BookingLimitDashBoard';
import DeleteBookingLimit from './assets/pages/Booking/DeleteBookingLimit';
import EditBookingLimit from './assets/pages/Booking/EditBookingLimit';


import ShowPayment from './assets/pages/Payment/ShowPayment';
import CreatePayments from './assets/pages/Payment/CreatePayments';
import ReadOnePayment from './assets/pages/Payment/ReadOnePayment';
//import UpdatePayment from './assets/pages/Payment/EditPayment';
import DeletePayment from './assets/pages/Payment/DeletePayment';
import EditPayment from './assets/pages/Payment/EditPayment';
import ReportPayment from './assets/pages/Payment/ReportPayment';

import CreateInvoice from './assets/pages/PaymentInvoice/CreateInvoice';
import ReadOneInvoice from './assets/pages/PaymentInvoice/ReadOneInvoice';
import ShowInvoice from './assets/pages/PaymentInvoice/ShowInvoice';
import EditInvoice from './assets/pages/PaymentInvoice/EditInvoice';
import DeleteInvoice from './assets/pages/PaymentInvoice/DeleteInvoice';
//import ReportInvoice from './assets/pages/PaymentInvoice/ReportInvoice';


import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';
import ReportEmployee from './assets/pages/Employee/ReportEmployee';

import ShowEmployeeAttendence from './assets/pages/EmployeeAttendence/ShowEmployeeAttendence';
import CreateEmployeeAttendence from './assets/pages/EmployeeAttendence/CreateEmployeeAttendence';
import EditEmployeeAttendence from './assets/pages/EmployeeAttendence/EditEmployeeAttendence';
import DeleteEmployeeAttendence from './assets/pages/EmployeeAttendence/DeleteEmployeeAttendence';
import ReportEmployeeAttendence from './assets/pages/EmployeeAttendence/ReportEmployeeAttendence';

import ShowEmployeeSalary from './assets/pages/EmployeeSalary/ShowEmployeeSalary';
import CreateEmployeeSalary from './assets/pages/EmployeeSalary/CreateEmployeeSalary';
import EditEmployeeSalary from './assets/pages/EmployeeSalary/EditEmployeeSalary';
import DeleteEmployeeSalary from './assets/pages/EmployeeSalary/DeleteEmployeeSalary';
import ReportEmployeeSalary from './assets/pages/EmployeeSalary/ReportEmployeeSalary';

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

import ShowService from './assets/pages/Service/Showservices';
import CreateService from './assets/pages/Service/CreateService';
import EditService from './assets/pages/Service/EditService';
import ReadOneService from './assets/pages/Service/ReadOneService';
import DeleteService from './assets/pages/Service/DeleteService';

import ShowInventory from './assets/pages/Inventory/ShowInventory'
import CreateInventory from './assets/pages/Inventory/CreateInventory'
import EditInventory from './assets/pages/Inventory/EditInventory'
import ReadOneInventory from './assets/pages/Inventory/ReadOneInventory'
import DeleteInventory from './assets/pages/Inventory/DeleteInventory'
import AddExistingInventory  from './assets/pages/Inventory/AddItemPage';
import RetrieveExistingInventory from './assets/pages/Inventory/RetrieveItemPage';
import InventoryDashboard  from './assets/pages/Inventory/InventoryDashboard';
import InventoryReport from './assets/pages/Inventory/InventoryReport';

import FeedbackDashBoard from './assets/pages/Feedback/FeedbackDashBoard';
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
import ReportCustomer from './assets/pages/Customer/ReportCustomer';

import ShowAllServiceHistory from './assets/pages/ServiceHistory/ShowAllServiceHistory';
import CreateServiceHistory from './assets/pages/ServiceHistory/CreateServiceHistory';
import EditServiceHistory from './assets/pages/ServiceHistory/EditServiceHistory';
import DeleteServiceHistory from './assets/pages/ServiceHistory/DeleteServiceHistory';
import ReadOneServiceHistory from './assets/pages/ServiceHistory/ReadOneServiceHistory';





import Dashboard from './assets/pages/dashboard/dashboard';
import ServiceHistoryDashboard from './assets/pages/ServiceHistory/ServiceHistoryDashboard';

import CusDashboard from './assets/pages/customerDashBoard/cusDashboard'; 
import VDashboard from './assets/pages/Vehicle/VehicleDashboard';

import EmpDashboard from './assets/pages/Employee/EmployeeDashboard';
import EmpADashboard from './assets/pages/EmployeeAttendence/EmpAttendenceDashboard';
import EmpSDashboard from './assets/pages/EmployeeSalary/EmpSalaryDashboard';

import CLogin from './assets/components/cLogin';
import ServiceDashboard from './assets/pages/Service/ServiceDashboard';
import PackageDashboard from './assets/pages/SPackage/PackageDashboard';


import ManagerLogin from './assets/components/ManagerLogin';
import Header from './assets/components/Header';

import { InvoiceDocument } from './assets/pages/PaymentInvoice/InvoiceDocument';

const App = () => {
  return (

    
    <>
    
      {/* <Header /> */}
      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/Mlogin' element={<ManagerLogin />}></Route>
        <Route path='/service/dashboard' element={<ServiceDashboard />}></Route>
        <Route path='/package/dashboard' element={<PackageDashboard />}></Route>
        <Route path='/customer/customerdashboard' element={<CustomerDashboard />}></Route>
        <Route path='/payments/pdashboard' element={<PaymentDashboard />}></Route>

        <Route path='/vehicle' element={<ShowVehicle />} />
        <Route path='/vehicle/create' element={<CreateVehicle />} />
        <Route path='/vehicle/edit/:id' element={<EditVehicle />} />
        <Route path='/vehicle/get/:id' element={<ReadOneVehicle />} />
        <Route path='/vehicle/delete/:id' element={<DeleteVehicle />} />
        <Route path='/vehicle/dashboard' element={<VDashboard />}></Route>

        <Route path='/employees/allEmployee' element={<ShowEmployee />}></Route>
        <Route path='/employees/create' element={<CreateEmployee />}></Route>
        <Route path='/employees/delete/:id' element={<DeleteEmployee />}></Route>
        <Route path='/employees/edit/:id' element={<EditEmployee />}></Route>
        <Route path='/employees/details/:id' element={<ReadOneEmployee />}></Route>
        <Route path='/employees/reportEmployee' element={<ReportEmployee />}></Route>
        <Route path='/employees/EmployeeDashboard' element={<EmpDashboard />}></Route>

        <Route path='/EmployeeAttendence/allEmployeeAttendence' element={<ShowEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/create' element={<CreateEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/edit/:id' element={<EditEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/delete/:id' element={<DeleteEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/reportEmployeeAttendence' element={<ReportEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/EmpADashboard' element={<EmpADashboard />}></Route>

        <Route path='/EmployeeSalary/allEmployeeSalary' element={<ShowEmployeeSalary />}></Route>
        <Route path='/EmployeeSalary/create' element={<CreateEmployeeSalary />}></Route>
        <Route path='/EmployeeSalary/edit/:id' element={<EditEmployeeSalary />}></Route>
        <Route path='/EmployeeSalary/delete/:id' element={<DeleteEmployeeSalary />}></Route>
        <Route path='/EmployeeSalary/reportEmployeeSalary' element={<ReportEmployeeSalary />}></Route>
        <Route path='/EmployeeSalary/EmpSDashboard' element={<EmpSDashboard />}></Route>

        <Route path='/payments/show' element={<ShowPayment />}></Route>
        <Route path='/payments/detail/:id' element={<ReadOnePayment />}></Route>
        <Route path='/payments/create' element={<CreatePayments />}></Route>
        <Route path='/payments/edit/:id' element={<EditPayment />}></Route>
        <Route path='/payments/delete/:id' element={<DeletePayment />}></Route>
        <Route path='/payments/report' element={<ReportPayment />}></Route>

        <Route path='/show-all' element={<ShowAllBooking />} />
        <Route path='/create' element={<CreateBooking />} />
        <Route path='/edit/:id' element={<EditBooking />} />
        <Route path='booking/delete/:id' element={<DeleteBooking />} />
        <Route path='booking/deletelimit/:id' element={<DeleteBookingLimit />} />
        <Route path='booking/updatelimit/:id' element={<EditBookingLimit />} />
        
        
        
        <Route path='booking/read/:id' element={<ReadOneBooking />} />
        <Route path='booking/dashboard' element={<BookingDashBoard />} />
        <Route path='booking/adminbooking' element={<AdminCreateBooking />} />
        <Route path='booking/addbookinglimit' element={<AddBookingLimit />} />
        <Route path='booking/bookinglimitdashboard' element={<BookingLimitDashBoard/>} />


        <Route path='/inventory/allInventory' element={<ShowInventory />}></Route>
        <Route path='/inventory/create' element={<CreateInventory />}></Route>
        <Route path='/inventory/edit/:id' element={<EditInventory />}></Route>
        <Route path='/inventory/delete/:id' element={<DeleteInventory />}></Route>
        <Route path='/inventory/get/:id' element={<ReadOneInventory />}></Route>

        <Route path='/package' element={<ShowPackage />} />
        <Route path='/package/create' element={<CreatePackage />} />
        <Route path='/package/edit/:id' element={<EditPackage />} />
        <Route path='/package/:id' element={<ReadOnePackage />} />
        <Route path='/package/delete/:id' element={<DeletePackage />} />



        <Route path='/service' element={<ShowService />}></Route>
        <Route path='/service/create' element={<CreateService />} />
        <Route path='/service/edit/:id' element={<EditService />} />
        <Route path='/service/get/:id' element={<ReadOneService />} />
        <Route path='/service/delete/:id' element={<DeleteService />} />

        <Route path='/show-all' element={<ShowAllBooking />} />
        <Route path='/create' element={<CreateBooking />} />
        <Route path='/edit/:id' element={<EditBooking />} />

        <Route path='/feedback' element={<ShowAllFeedback />}></Route>
        <Route path='/feedback/create' element={<CreateFeedback />}></Route>
        <Route path='/feedback/edit/:id' element={<EditFeedback />}></Route>
        <Route path='/feedback/delete/:id' element={<DeleteFeedback />}></Route>
        <Route path='/feedback/get/:id' element={<ReadOneFeedback />}></Route>
        <Route path='/feedback/dashboard' element={<FeedbackDashBoard/>}></Route>

        <Route path='/customer/allCustomer' element={<ShowCustomer />}></Route>
        <Route path='/customer/create' element={<CreateCustomer />}></Route>
        <Route path='/customer/edit/:id' element={<UpdateCustomer />}></Route>
        <Route path='/customer/delete/:id' element={<DeleteCustomer />}></Route>
        <Route path='/customer/get/:id' element={<ReadOneCustomer />}></Route>

        <Route path='/ServiceHistory' element={<ShowAllServiceHistory />}></Route>
        <Route path='/ServiceHistory/create' element={<CreateServiceHistory />}></Route>
        <Route path='/ServiceHistory/edit/:id' element={<EditServiceHistory />}></Route>
        <Route path='/ServiceHistory/delete/:id' element={<DeleteServiceHistory />}></Route>
        <Route path='/ServiceHistory/get/:id' element={<ReadOneServiceHistory />}></Route>
        <Route path='/ServiceHistory/dashboard' element={<ServiceHistoryDashboard />}></Route>

        <Route path='/Servic' element={<ShowService />}></Route>
        <Route path='/Service/create' element={<CreateService />}></Route>
        <Route path='/Service/edit/:id' element={<EditService />}></Route>
        <Route path='/Service/delete/:id' element={<DeleteService />}></Route>
        <Route path='/Service/get/:id' element={<ReadOneService />}></Route>

        <Route path='/customer/allCustomer' element={<ShowCustomer />}></Route>
        <Route path='/customer/create' element={<CreateCustomer />}></Route>
        <Route path='/customer/edit/:id' element={<UpdateCustomer />}></Route>
        <Route path='/customer/delete/:id' element={<DeleteCustomer />}></Route>
        <Route path='/customer/get/:id' element={<ReadOneCustomer />}></Route>
        <Route path='/customer/ReportCustomer' element={<ReportCustomer />}></Route>

        <Route path='/ServiceHistory' element={<ShowAllServiceHistory />}></Route>
        <Route path='/ServiceHistory/create' element={<CreateServiceHistory />}></Route>
        <Route path='/ServiceHistory/edit/:id' element={<EditServiceHistory />}></Route>
        <Route path='/ServiceHistory/delete/:id' element={<DeleteServiceHistory />}></Route>
        <Route path='/ServiceHistory/get/:id' element={<ReadOneServiceHistory />}></Route>

        <Route path='/cusDashboard' element={<CusDashboard />}></Route>
        <Route path='/cLogin' element={<CLogin />}></Route>'

      <Route path='/' element={<Home />}></Route>
      <Route path='/ReadOneHome/:cusID' element={<ReadOneHome />}></Route>     
      <Route path='/Mlogin' element={<ManagerLogin/>}></Route>
      

      <Route path='/vehicle' element={<ShowVehicle />} />
      <Route path='/vehicle/create' element={<CreateVehicle />} />
      <Route path='/vehicle/edit/:id' element={<EditVehicle />} />
      <Route path='/vehicle/get/:id' element={<ReadOneVehicle />} />
      <Route path='/vehicle/delete/:id' element={<DeleteVehicle />} />


      

      

      <Route path='/payments/show' element={<ShowPayment />}></Route>
      <Route path='/payments/detail/:id' element={<ReadOnePayment />}></Route>
      <Route path='/payments/create' element={<CreatePayments />}></Route>
       <Route path='/payments/edit/:id' element={<EditPayment />}></Route>
      <Route path='/payments/delete/:id' element={<DeletePayment />}></Route>
      <Route path='/payments/report' element={<ReportPayment />}></Route>
      
      <Route path='/PaymentInvoice/show' element={<ShowInvoice/>}></Route>
      <Route path='/PaymentInvoice/create' element={<CreateInvoice/>}></Route>
      <Route path='/PaymentInvoice/edit/:id' element={<EditInvoice/>}></Route>
      <Route path='/PaymentInvoice/delete/:id' element={<DeleteInvoice/>}></Route>
      {/* <Route path='/PaymentInvoice/delete/:id' element={<ReportInvoice/>}></Route> */}
      <Route path='/PaymentInvoice/read/:id' element={<ReadOneInvoice/>}></Route> 
      <Route path='/PaymentInvoice/InvoiceDocument' element={<InvoiceDocument/>}></Route>


      <Route path ='/show-all'  element={<ShowAllBooking/>}/>
      <Route path='/create' element={<CreateBooking/>}/>
      <Route path='/create/:cusID' element={<CreateBooking/>}/>
      <Route path='/edit/:id' element={<EditBooking/>}/>
      <Route path='booking/delete/:id' element={<DeleteBooking/>}/>
      <Route path='booking/read/:id' element={<ReadOneBooking/>}/>

      <Route path='/show-all' element={<ShowAllBooking />} />
      <Route path='/create' element={<CreateBooking />} />
      <Route path='/edit/:id' element={<EditBooking />} />
      <Route path='booking/delete/:id' element={<DeleteBooking />} />
      <Route path='booking/read/:id' element={<ReadOneBooking />} />


      <Route path='/inventory/allInventory' element={<ShowInventory />}></Route>
      <Route path='/inventory/create' element={<CreateInventory />}></Route>
      <Route path='/inventory/edit/:id' element={<EditInventory />}></Route>
      <Route path='/inventory/delete/:id' element={<DeleteInventory />}></Route>
      <Route path='/inventory/get/:id' element={<ReadOneInventory />}></Route>
      <Route path='/inventory/addItem/:id' element={<AddExistingInventory />}></Route>
      <Route path='/inventory/retrieveItem/:id' element={<RetrieveExistingInventory />}></Route>
      <Route path='/inventory/InventoryDashboard' element={<InventoryDashboard />}></Route>
      <Route path='/inventory/InventoryReport' element={<InventoryReport/>}></Route>

    



      <Route path='/package' element={<ShowPackage/>}></Route>
      <Route path='/package/create' element={<CreatePackage/>}></Route>
      <Route path='/package/edit/:id' element={<EditPackage/>}></Route>
      <Route path='/package/get/:id' element={<ReadOnePackage/>}></Route>
      <Route path='/package/delete/:id' element={<DeletePackage/>}></Route>

      <Route path ='/show-all'  element={<ShowAllBooking/>}/>
      <Route path='/create' element={<CreateBooking/>}/>
      <Route path='/edit/:id' element={<EditBooking/>}/>





      <Route path='/package' element={<ShowPackage />}></Route>
      <Route path='/package/create' element={<CreatePackage />}></Route>
      <Route path='/package/edit/:id' element={<EditPackage />}></Route>
      <Route path='/package/get/:id' element={<ReadOnePackage />}></Route>
      <Route path='/package/delete/:id' element={<DeletePackage />}></Route>

      <Route path='/service' element={<ShowService />}></Route>
      <Route path='/service/create' element={<CreateService />} />
      <Route path='/service/edit/:id' element={<EditService />} />
      <Route path='/service/get/:id' element={<ReadOneService />} />
      <Route path='/service/delete/:id' element={<DeleteService />} />

      <Route path='/show-all' element={<ShowAllBooking />} />
      <Route path='/create' element={<CreateBooking />} />
      <Route path='/edit/:id' element={<EditBooking />} />




      <Route path='/feedback' element={<ShowAllFeedback />}></Route>
      <Route path='/feedback/create' element={<CreateFeedback />}></Route>
      <Route path='/feedback/create/:cusID' element={<CreateFeedback />}></Route>
      <Route path='/feedback/edit/:id' element={<EditFeedback />}></Route>
      <Route path='/feedback/delete/:id' element={<DeleteFeedback />}></Route>
      <Route path='/feedback/get/:id' element={<ReadOneFeedback />}></Route>



      <Route path='/feedback' element={<ShowAllFeedback/>}></Route>
      <Route path='/feedback/create' element={<CreateFeedback/>}></Route>
      <Route path='/feedback/edit/:id' element={<EditFeedback/>}></Route>
      <Route path='/feedback/delete/:id' element={<DeleteFeedback/>}></Route>
      <Route path='/feedback/get/:id' element={<ReadOneFeedback/>}></Route>

      <Route path='/customer/allCustomer' element={<ShowCustomer />}></Route>
      <Route path='/customer/create' element={<CreateCustomer />}></Route>
      <Route path='/customer/edit/:id' element={<UpdateCustomer />}></Route>
      <Route path='/customer/delete/:id' element={<DeleteCustomer />}></Route>
      <Route path='/customer/get/:id' element={<ReadOneCustomer />}></Route>
       

 


      <Route path='/ServiceHistory' element={<ShowAllServiceHistory />}></Route>
      <Route path='/ServiceHistory/create' element={<CreateServiceHistory />}></Route>
      <Route path='/ServiceHistory/edit/:id' element={<EditServiceHistory />}></Route>
      <Route path='/ServiceHistory/delete/:id' element={<DeleteServiceHistory />}></Route>
      <Route path='/ServiceHistory/get/:id' element={<ReadOneServiceHistory />}></Route>


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
    
      <Route path='/dashboard' element={<Dashboard/>}></Route>  
      

      <Route path='/Servic' element={<ShowService />}></Route>
      <Route path='/Service/create' element={<CreateService/>}></Route>
      <Route path='/Service/edit/:id' element={<EditService />}></Route>
      <Route path='/Service/delete/:id' element={<DeleteService />}></Route>
      <Route path='/Service/get/:id' element={<ReadOneService />}></Route>

   
    <Route path='/customer/allCustomer' element={<ShowCustomer/>}></Route>
    <Route path='/customer/create' element={<CreateCustomer/>}></Route>
    <Route path='/customer/edit/:id' element={<UpdateCustomer/>}></Route>
    <Route path='/customer/delete/:id' element={<DeleteCustomer/>}></Route>
    <Route path='/customer/get/:id' element={<ReadOneCustomer/>}></Route>
    <Route path='/customer/ReportCustomer' element={<ReportCustomer/>}></Route>

    <Route path='/ServiceHistory' element={<ShowAllServiceHistory/>}></Route>
    <Route path='/ServiceHistory/create' element={<CreateServiceHistory/>}></Route>
    <Route path='/ServiceHistory/edit/:id' element={<EditServiceHistory/>}></Route>
    <Route path='/ServiceHistory/delete/:id' element={<DeleteServiceHistory/>}></Route>
    <Route path='/ServiceHistory/get/:id' element={<ReadOneServiceHistory/>}></Route>
  
    <Route path='/cusDashboard' element={<CusDashboard/>}></Route>
    <Route path='/cLogin' element={<CLogin/>}></Route>'

      </Routes>
    </>
  );


}

export default App;