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
  const [appetizers, setAppetizers] = useState('');
  const [soups, setSoups] = useState('');
  const [entrees, setEntrees] = useState('');
  const [grilledOrBBQ, setGrilledOrBBQ] = useState('');
  const [sideDishes, setSideDishes] = useState('');
  const [desserts, setDesserts] = useState('');
  const [beverages, setBeverages] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
function CreateInventory() {
  return (
    <div>CreateInventory</div>
  )
}

export default CreateInventory