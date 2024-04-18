import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const ReportPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8076/payments?search=${searchQuery}`
      );
      setPayments(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching payment:", error);
      setError(
        "An error occurred while fetching the payment for the search query."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8076/payments")
      .then((response) => {
        setPayments(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while fetching payments.");
        setLoading(false);
      });
  }, []);

  // Report generating
  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Payment List",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  // Filter function to apply search query filter
  const applySearchFilter = (payment) => {
    return (
      payment.PaymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.PaymentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.totalAmount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.PaymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filter payments based on search query
  const filteredPayments = payments.filter(applySearchFilter);

  return (
    <div className="p-4">
      <BackButton destination='/payments/show' /> {/* Pass the destination URL here */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Payment List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
            className="mr-2 border border-gray-400 p-2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
        
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <table className="w-full border-separate border-spacing-2" ref={componentRef}>
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Payment ID</th>
                <th className="border border-slate-600 rounded-md">Customer ID</th>
                <th className="border border-slate-600 rounded-md">Service ID</th>
                <th className="border border-slate-600 rounded-md">Package</th>
                <th className="border border-slate-600 rounded-md">Service Name</th>
                <th className="border border-slate-600 rounded-md">Vehicle No</th>
                <th className="border border-slate-600 rounded-md">Date</th>
                <th className="border border-slate-600 rounded-md">Package Amount</th>
                <th className="border border-slate-600 rounded-md">Service Amount</th>
                <th className="border border-slate-600 rounded-md">Total Amount</th>
                <th className="border border-slate-600 rounded-md">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.PaymentId}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.cusID}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.Booking_Id}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.Package}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.selectedServices}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.Vehicle_Number}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.PaymentDate}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.Pamount}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.Samount}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.totalAmount}</td>
                  <td className="border border-slate-700 rounded-md text-center">{payment.PaymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={generatePDF}
            >
              Generate PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportPayment;
