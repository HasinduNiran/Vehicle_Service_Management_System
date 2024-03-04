import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Functional component for creating inventory
const CreateInventory = () => {
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

  // Event handler for saving the inventory
  const handleSaveInventory = () => {
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

    // Making a POST request to save the inventory data
    axios
      .post('http://localhost:8076/inventory', data)
      .then(() => {
        // Resetting loading state and navigating to the home page
        setLoading(false);
        navigate('/inventory/allInventory');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.error(error);
      });
  };

  // JSX for rendering the create inventory form
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Add Inventory</h1>
      {loading ? <Spinner /> : ''}

      {/* Form for creating a inventory */}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Additional form fields should be added as needed */}
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

        {/* Save button */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveInventory}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateInventory