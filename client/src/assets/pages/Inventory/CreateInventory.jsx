import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Functional component for creating inventory
const CreateInventory = () => {
  // State variables for managing form data, loading state, and errors
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasedPrice, setPurchasedPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to validate form inputs
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate Name
    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Validate Location
    if (!location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }

    // Validate Quantity
    if (!quantity.trim()) {
      errors.quantity = 'Quantity is required';
      isValid = false;
    } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
      errors.quantity = 'Quantity must be a positive number';
      isValid = false;
    }

    // Validate Purchased Price
    if (!purchasedPrice.trim()) {
      errors.purchasedPrice = 'Purchased Price is required';
      isValid = false;
    } else if (isNaN(purchasedPrice) || parseFloat(purchasedPrice) <= 0) {
      errors.purchasedPrice = 'Purchased Price must be a positive number';
      isValid = false;
    }

    // Validate Sell Price
    if (!sellPrice.trim()) {
      errors.sellPrice = 'Sell Price is required';
      isValid = false;
    } else if (isNaN(sellPrice) || parseFloat(sellPrice) <= 0) {
      errors.sellPrice = 'Sell Price must be a positive number';
      isValid = false;
    }

    // Validate Supplier Name
    if (!supplierName.trim()) {
      errors.supplierName = 'Supplier Name is required';
      isValid = false;
    }

    // Validate Supplier Phone
    if (!supplierPhone.trim()) {
      errors.supplierPhone = 'Supplier Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(supplierPhone)) {
      errors.supplierPhone = 'Supplier Phone must be a 10-digit number';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Event handler for saving the inventory
  const handleSaveInventory = () => {
    if (!validateForm()) {
      return; // Don't proceed if form validation fails
    }

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
        // Displaying success toast
        Swal.fire({
          icon: 'success',
          title: 'Inventory item created successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        // Resetting loading state and navigating to the home page after 3000ms
        setTimeout(() => {
          setLoading(false);
          navigate('/inventory/allInventory');
        }, 1500);
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
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Purchased Price</label>
          <input
            type="number"
            value={purchasedPrice}
            onChange={(e) => setPurchasedPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.purchasedPrice && <p className="text-red-500">{errors.purchasedPrice}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Sell Price</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.sellPrice && <p className="text-red-500">{errors.sellPrice}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Supplier Name</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.supplierName && <p className="text-red-500">{errors.supplierName}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Supplier Phone</label>
          <input
            type="text"
            value={supplierPhone}
            onChange={(e) => setSupplierPhone(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.supplierPhone && <p className="text-red-500">{errors.supplierPhone}</p>}
        </div>

        {/* Save button */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveInventory}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateInventory;
