// Importing necessary dependencies
import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for AddExistingInventory
const AddExistingInventory = () => {
  // State variables for managing form data and loading state
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [newStock, setNewStock] = useState(0); // New state variable for adding stock
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/inventory/${id}`, {
      params: {
        fields: ['Name', 'Quantity'].join(',')
      }
    })
      .then((response) => {
        const data = response.data;
        setName(data.Name);
        setQuantity(data.Quantity);
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
  const data = {
    Quantity: quantity,
  };

  setLoading(true);

  axios
    .put(`http://localhost:8076/inventory/${id}`, data)
    .then(() => {
      setLoading(false);
      // Navigate to read-one page with updated stock
      navigate(`/inventory/get/${id}`);
    })
    .catch((error) => {
      setLoading(false);
      alert('An error happened. Please check console');
      console.log(error);
    });
};

  // Event handler for adding stock to the inventory
  const handleAddStock = () => {
    if (newStock > 0) { // Check if new stock quantity is positive
      const updatedQuantity = parseInt(quantity) + newStock;
      setQuantity(updatedQuantity); // Update quantity with new stock
      const data = {
        Quantity: updatedQuantity
      };
      axios
        .put(`http://localhost:8076/inventory/${id}`, data)
        .then(() => {
          setNewStock(0); // Reset new stock quantity
        })
        .catch((error) => {
          alert('An error happened while updating quantity.');
          console.log(error);
        });
    } else {
      alert('Please enter a valid quantity.'); // Alert if new stock quantity is not positive
    }
  };

  // JSX for rendering the edit inventory form
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Inventory</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Current Quantity</label>
          <input
            type="number"
            value={quantity}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Add Stock</label>
          <input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(parseInt(e.target.value))}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className='p-2 bg-sky-300 m-2' onClick={handleAddStock}>
          Add Stock
        </button>
        <button className='p-2 bg-sky-300 m-2' onClick={handleEditInventory}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the AddExistingInventory component
export default AddExistingInventory;
