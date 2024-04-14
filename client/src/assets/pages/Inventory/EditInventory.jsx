// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import Spinner from "../../components/Spinner"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

// Functional component for EditInventory
const EditInventory = () => {
  // State variables for managing form data and loading state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasedPrice, setPurchasedPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/inventory/${id}`)
      .then((response) => {
        const data = response.data;
        setName(data.Name);
        setLocation(data.Location);
        setQuantity(data.Quantity);
        setPurchasedPrice(data.PurchasedPrice);
        setSellPrice(data.SellPrice);
        setSupplierName(data.SupplierName);
        setSupplierPhone(data.SupplierPhone);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`An error happened. Please check console`);
        console.log(error);
      });
  }, [id]);

  // Event handler for editing the inventory
  const handleEditInventory = () => {
    // Creating data object from form inputs
    const data = {
      Name: name,
      Location: location,
      Quantity: quantity,
      PurchasedPrice: purchasedPrice,
      SellPrice: sellPrice,
      SupplierName: supplierName,
      SupplierPhone: supplierPhone,
    };

    setLoading(true);

    // Making a PUT request to edit the inventory data
    axios
      .put(`http://localhost:8076/inventory/${id}`, data)
      .then(() => {
        // Resetting loading state
        setLoading(false);
        // Display SweetAlert2 when data is successfully edited
        Swal.fire("Success!", "Inventory data updated successfully!", "success").then(() => {
          // After user clicks OK, navigate to the home page
          navigate('/inventory/allInventory');
        });
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the edit inventory form
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit inventory</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">PurchasedPrice</label>
          <input
            type="number"
            value={purchasedPrice}
            onChange={(e) => setPurchasedPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">SellPrice</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">SupplierName</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">SupplierPhone</label>
          <input
            type="text"
            value={supplierPhone}
            onChange={(e) => setSupplierPhone(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditInventory}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditInventory component
export default EditInventory;
