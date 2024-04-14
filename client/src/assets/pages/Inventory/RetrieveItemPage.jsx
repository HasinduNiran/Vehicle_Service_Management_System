import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import BackButton from '../../components/BackButton';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const RetrieveExistingInventory = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [retrieveAmount, setRetrieveAmount] = useState(0);
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

  const handleRetrieve = () => {
    if (retrieveAmount > 0) {
      const updatedQuantity = parseInt(quantity) - retrieveAmount;
      if (updatedQuantity >= 0) {
        setQuantity(updatedQuantity);
        const data = {
          Quantity: updatedQuantity
        };
        axios
          .put(`http://localhost:8076/inventory/${id}`, data)
          .then(() => {
            setRetrieveAmount(0);
            // Display SweetAlert2 when item is successfully removed
            Swal.fire("Success!", "Item retrieved successfully!", "success");
          })
          .catch((error) => {
            alert('An error happened while updating quantity.');
            console.log(error);
          });
      } else {
        alert('Cannot retrieve more than current quantity.');
      }
    } else {
      alert('Please enter a valid retrieve amount.');
    }
  };

  const handleSave = () => {
    navigate(`/inventory/get/${id}`);
  };

  return (
    <div className="p-4">
        <BackButton destination={`/inventory/get/${id}`} />
      <h1 className="text-3xl my-4">View Inventory</h1>
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
          <label className="text-xl mr-4 text-gray-500">Quantity</label>
          <input
            type="number"
            value={quantity}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Retrieve Amount</label>
          <input
            type="number"
            value={retrieveAmount}
            onChange={(e) => setRetrieveAmount(parseInt(e.target.value))}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button onClick={handleRetrieve} className="bg-blue-500 text-white px-4 py-2 rounded-md">Retrieve</button>
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">Save</button>
      </div>
    </div>
  );
};

export default RetrieveExistingInventory;
