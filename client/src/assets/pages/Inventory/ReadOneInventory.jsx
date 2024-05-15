import { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { useParams, Link, useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import backgroundImage from '../../images/t.jpg';

const ReadOneInventory = () => {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8076/inventory/${id}`)
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQuantity = searchParams.get('newQuantity');
    if (newQuantity !== null && inventory !== null) {
      const updatedInventory = { ...inventory, Quantity: newQuantity };
      setInventory(updatedInventory);
      axios
        .put(`http://localhost:8076/inventory/${id}`, updatedInventory)
        .then(() => console.log('Quantity updated in database'))
        .catch((error) =>
          console.error('Error updating quantity in database:', error)
        );
    }
  }, [location.search, id, inventory]);

  const handleRetrieveItems = () => {
    // Logic for retrieving items from the inventory goes here
    // For example:
    console.log('Retrieving items from inventory...');
  };

  if (loading) {
    return <Spinner />;
  }

  if (!inventory) {
    return <p>Data is loading...</p>;
  }

  return (
    <div style={styles.container}>
      <BackButton destination={`/inventory/InventoryDashboard`} />
      <h1 style={styles.heading}>Show Inventory</h1>
      <div style={styles.vehicleContainer}>
        <div style={styles.vehicleInfo}>
          <div className="my-4">
            <span style={styles.label}>Item Number</span>
            <span style={styles.value}>{inventory._id}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Name</span>
            <span style={styles.value}>{inventory.Name}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Location</span>
            <span style={styles.value}>{inventory.Location}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Quantity</span>
            <span style={styles.value}>{inventory.Quantity}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Purchased Price</span>
            <span style={styles.value}>{inventory.PurchasedPrice}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Sell Price</span>
            <span style={styles.value}>{inventory.SellPrice}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Supplier Name</span>
            <span style={styles.value}>{inventory.SupplierName}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Supplier Phone</span>
            <span style={styles.value}>{inventory.SupplierPhone}</span>
          </div>

          <div className="my-4">
            <span style={styles.label}>Supplier Email</span>
            <span style={styles.value}>{inventory.SupplierEmail}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Create Time</span>
            <span style={styles.value}>{new Date(inventory.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Last Update Time</span>
            <span style={styles.value}>{new Date(inventory.updatedAt).toString()}</span>
          </div>
          <div className="flex justify-between">
            <Link
              to={`/inventory/addItem/${id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Item
            </Link>
            <Link
              to={`/inventory/retrieveItem/${id}`}
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Retrieve Item
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#fff',
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding: '10px',
    display: 'block',
    textTransform: 'uppercase',
  },
  vehicleContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 4, 0.6)',
    borderRadius: '10px',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    padding: '20px',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backdropFilter: 'blur(100px)', // Adjust the blur effect here
    opacity: '0.9', // Adjust the opacity here
  },
  vehicleInfo: {
    margin: '0 auto',
    padding: '20px',
    width: '80%',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  label: {
    fontWeight: 'bold',
    color: 'red',
    width: '100%',
    padding: '1px',
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
  },
  serviceHistory: {
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    background: '#333',
    color: 'red',
    textAlign: 'center',
    border: '1px solid red',
  },
  tableHeader: {
    padding: '10px',
    textAlign: 'left',
    color: 'red',
    border: '1px solid red',
  },
  tableRowEven: {
    background: '#2f2f2f',
  },
  tableRowOdd: {
    background: '#1f1f1f',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    border: '1px solid red',
  },
};


export default ReadOneInventory;
