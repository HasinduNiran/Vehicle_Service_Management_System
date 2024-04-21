import React, { useEffect } from "react";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditInvoice= () => {

  const[InvoiceId,setInvoiceId] = useState('');
  const[customerName,setcustomerName] = useState('');
  const [cusID,setcusID] = useState('');
  const[PaymentId,setPaymentId] = useState('');
  const[Package,setPackage] = useState('');
  const[selectedServices,setSelectedServices] = useState('');
  const[Vehicle_Number,setVehicle_Number] = useState('');
  const[Vehicle_Color,setVehicle_Color] = useState('');
  const[Model,setModel] = useState('');
  const[Year,setYear] = useState('');
  const[Engine_Details,setEngine_Details] = useState('');
  const[PaymentDate,setPaymentDate] = useState('');
  const[Pamount,setPamount] = useState('');
  const[Samount,setSamount] = useState('');
  const[totalAmount,settotalAmount] = useState('');
  const[Booking_Id,setBooking_Id] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/PaymentInvoice/${id}`)
      .then((response) => {
        setInvoiceId(response.data.InvoiceId);
        setcustomerName(response.data.customerName);
        setcusID(response.data.cusID);
        setPaymentId(response.data.PaymentId);
        setPackage(response.data.Package);
        setSelectedServices(response.data.selectedServices);
        setVehicle_Number(response.data.Vehicle_Number);
        setVehicle_Color(response.data.Vehicle_Color);
        setModel(response.data.Model);
        setYear(response.data.Year);
        setEngine_Details(response.data.Engine_Details);
        setPaymentDate(response.data.PaymentDate);
        setPamount(response.data.Pamount);
        setSamount(response.data.Samount);
        settotalAmount(response.data.totalAmount);
        setBooking_Id(response.data.Booking_Id);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred");
        console.log(error);
      });
  }, []);
  const handleEditPaymentInvoice = () => {
    const data = {
      InvoiceId,
      customerName,
      PaymentId,
      cusID,
      Package,
      selectedServices,
      Vehicle_Number,
      Vehicle_Color,
      Model,
      Year,
      Engine_Details,
      PaymentDate,
      Pamount,
      Samount,
      totalAmount,
      Booking_Id,
      
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/PaymentInvoice/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/PaymentInvoice/show");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton destination="/payments/show" />{" "}
      {/* Pass the destination URL here */}
      <h1 className="text-3xl my-4">Edit Invoice</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Invoice Id</label>
          <input
            type="text"
            value={InvoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
           <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Customer ID</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {cusID}
          </div>
        </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Payment ID</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {PaymentId}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Vehicle NO</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Vehicle_Number}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Package</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Package}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Service Name</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {selectedServices}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Color</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Vehicle_Color}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Model</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Model}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Year</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Year}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Engine</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Engine_Details}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Date</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full ">
            {PaymentDate}
          </div>
          <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Package Amount</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full ">
            {Pamount}
          </div>
          <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Service Amount</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full ">
            {Samount}
          </div>
          <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Amount</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full ">
            {totalAmount}
          </div>
          <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Service Id</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full ">
            {Booking_Id}
          </div>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditPaymentInvoice}>
          Save
        </button>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};
export default EditInvoice;