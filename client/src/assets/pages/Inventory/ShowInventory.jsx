import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowInventory = () => {
  // State for inventory items and loading indicator
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8076/inventory?search=${searchQuery}`
      );
      setInventory(response.data.data);
      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching Inventory Items:", error);
      setError(
        "An error occurred while fetching the Inventory Items for the search query."
      );
      setLoading(false);
    }
  };

  // Fetch inventory items from the server on component mount
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
  // Filter function to apply search query filter
  const applySearchFilter = (inventoryItem) => {
    if (!inventoryItem) return false; // Add null check
    return (
      (String(inventoryItem.No) && String(inventoryItem.No).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.Name) && String(inventoryItem.Name).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.Location) && String(inventoryItem.Location).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.Quantity) && String(inventoryItem.Quantity).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.PurchasedPrice) && String(inventoryItem.PurchasedPrice).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.SellPrice) && String(inventoryItem.SellPrice).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.SupplierName) && String(inventoryItem.SupplierName).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.SupplierPhone) && String(inventoryItem.SupplierPhone).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(inventoryItem.Operations) && String(inventoryItem.Operations).toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  
  
  
  

  // Filter Inventory Items based on search query
  const filteredInventory = inventory.filter(applySearchFilter);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="mb-4">
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
        <h1 className="text-3xl my-8">Inventory List</h1>
        <Link to="/inventory/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {/* Display loading spinner or inventory table */}
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              {/* Table headers */}
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">Location</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Quantity
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Purchased Price
              </th>
              <th className="border border-slate-600 rounded-md">Sell Price</th>
              <th className="border border-slate-600 rounded-md">
                Supplier Name
              </th>
              <th className="border border-slate-600 rounded-md">
                Supplier Phone
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {/* Display inventory items */}
            {filteredInventory.map((inventoryItem, index) => (
              <tr key={inventoryItem._id} className="h-8">
                {/* Table cells for each inventory item */}
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {inventoryItem.Name}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {inventoryItem.Location}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {inventoryItem.Quantity}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {inventoryItem.PurchasedPrice}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {inventoryItem.SellPrice}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {inventoryItem.SupplierName}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {inventoryItem.SupplierPhone}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {/* Operations (Info, Edit, Delete) for each inventory item */}
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/inventory/get/${inventoryItem._id}`}>
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/inventory/edit/${inventoryItem._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-600" />
                    </Link>
                    <Link to={`/inventory/delete/${inventoryItem._id}`}>
                      <MdOutlineDelete className="text-2x1 text-red-600" />
                    </Link>
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
