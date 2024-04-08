import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2';

const ShowInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8076/inventory?search=${searchQuery}`
      );
      setInventory(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching Inventory Items:", error);
      setError(
        "An error occurred while fetching the Inventory Items for the search query."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8076/inventory")
      .then((response) => {
        setInventory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Inventory List',
    onAfterPrint: () => alert('Data saved in PDF'),
  });

  const applySearchFilter = (inventoryItem) => {
    if (!inventoryItem) return false;
    const searchableFields = [
      'No',
      'Name',
      'Location',
      'Quantity',
      'PurchasedPrice',
      'SellPrice',
      'SupplierName',
      'SupplierPhone',
      'Operations'
    ];

    return searchableFields.some(field =>
      String(inventoryItem[field]).toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredInventory = inventory.filter(applySearchFilter);

  useEffect(() => {
    const itemsBelow15 = filteredInventory.filter(item => item.Quantity <= 15);
    if (itemsBelow15.length > 0) {
      const itemNamesList = itemsBelow15.map(item => `<li>${item.Name}</li>`).join('');
      Swal.fire({
        icon: "warning",
        title: "warning",
        html: `Quantity of the following items are in low level<ul>${itemNamesList}</ul>`,
      });
    }
  }, [filteredInventory]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8076/inventory/${id}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              }).then(() => {
                // Refresh the inventory list after successful deletion
                handleSearch();
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete item.",
                icon: "error"
              });
            }
          })
          .catch(error => {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete item.",
              icon: "error"
            });
          });
      }
    });
  };
  

  return (
    <div className="p-4" ref={componentRef}>
      <h1 className="text-3xl mb-8">Inventory List</h1>
      <div className="mb-4 flex justify-end items-center">
        <input
          type="text"
          name="searchQuery"
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
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/inventory/create'}>
          Add Inventory
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2" ref={componentRef}>
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">Location</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Quantity</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Purchased Price</th>
              <th className="border border-slate-600 rounded-md">Sell Price</th>
              <th className="border border-slate-600 rounded-md">Supplier Name</th>
              <th className="border border-slate-600 rounded-md">Supplier Phone</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((inventoryItem, index) => (
              <tr key={inventoryItem._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                <td className="border border-slate-700 rounded-md text-center">{inventoryItem.Name}</td>
                <td className="border border-slate-700 rounded-md text-center">{inventoryItem.Location}</td>
                <td className={`border border-slate-700 rounded-md text-center max-md:hidden ${inventoryItem.Quantity <= 15 ? 'text-red-500' : ''}`}>{inventoryItem.Quantity}</td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">{inventoryItem.PurchasedPrice}</td>
                <td className="border border-slate-700 rounded-md text-center">{inventoryItem.SellPrice}</td>
                <td className="border border-slate-700 rounded-md text-center">{inventoryItem.SupplierName}</td>
                <td className="border border-slate-700 rounded-md text-center">{inventoryItem.SupplierPhone}</td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/inventory/get/${inventoryItem._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/inventory/edit/${inventoryItem._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <button onClick={() => handleDelete(inventoryItem._id)}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowInventory;
