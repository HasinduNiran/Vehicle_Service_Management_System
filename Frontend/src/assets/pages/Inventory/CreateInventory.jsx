// Importing necessary dependencies
import { useState } from "react";
import React from 'react'
// import BackButton from "../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/CreateMenu.css";

// Functional component for creating inventory
const CreateInventory = () => {
  // State variables for managing form data and loading state
  const [Name, setName] = useState('');
  const [Location, setLocation] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [PurchasedPrice, setPurchasedPrice] = useState('');
  const [SellPrice, setSellPrice] = useState('');
  const [SupplierName, setSupplierName] = useState('');
  const [beverages, setBeverages] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
function CreateInventory() {
  return (
    <div>CreateInventory</div>
  )
}

export default CreateInventory