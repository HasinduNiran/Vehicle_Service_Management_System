import React, { useEffect } from "react";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPayment = () => {
  const [PaymentId, setPaymentId] = useState("");
  const [cusID, setCusID] = useState("");
  const [Vehicle_Number, setVehicle_Number] = useState("");
  const [Package, setPackage] = useState("");
  const [selectedServices, setSelectedServices] = useState("");
  const [PaymentDate, setPaymentDate] = useState("");
  const [Pamount, setPamount] = useState("");
  const [Samount, setSamount] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [Booking_Id, setBooking_Id] = useState("");
  const [Servicehistory, setServiceHistory] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/payments/${id}`)
      .then((response) => {
        setPaymentId(response.data.PaymentId);
        setCusID(response.data.cusID);
        setVehicle_Number(response.data.Vehicle_Number);
        setPackage(response.data.Package);
        setSelectedServices(response.data.selectedServices);
        setPaymentDate(response.data.PaymentDate);
        setPamount(response.data.Pamount);
        setSamount(response.data.Samount);
        settotalAmount(response.data.totalAmount);
        setPaymentMethod(response.data.PaymentMethod);
        setBooking_Id(response.data.Booking_Id);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred");
        console.log(error);
      });
  }, []);
  const handleEditPayment = () => {
    const data = {
      PaymentId,
      cusID,
      Vehicle_Number,
      Booking_Id,
      Package,
      selectedServices,
      PaymentDate,
      Pamount,
      Samount,
      totalAmount,
      PaymentMethod,
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/payments/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/payments/pdashboard");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/payments/pdashboard" />{" "}
      {/* Pass the destination URL here */}
      <h1 className="text-3xl my-4">Create Payment</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">PaymentId</label>
          <input
            type="text"
            value={PaymentId}
            onChange={(e) => setPaymentId(e.target.value)}
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
          <label className="text-xl mr-4 text-gray-500">Service ID</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Booking_Id}
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
          <label className="text-xl mr-4 text-gray-500">Vehicle ID</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full ">
            {Vehicle_Number}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Payment Date</label>
          <input
            type="Date"
            value={PaymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Package Amount</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Pamount}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Service Amount</label>
          <div className="border-2 border-gray-500 px-4 py-2  w-full">
            {Samount}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">totalAmount</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => settotalAmount(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Payment Method</label>
          <select
            value={PaymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditPayment}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPayment;
