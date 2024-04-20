import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner'; // Importing Spinner component
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import { AiOutlineEdit } from 'react-icons/ai'; // Importing edit icon
import { BsInfoCircle } from 'react-icons/bs'; // Importing info icon
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'; // Importing delete icon
import Swal from 'sweetalert2'; // Importing SweetAlert2 for pop-up alerts
import InventoryReport from './InventoryReport'; // Importing InventoryReport component
import logo from '../../images/logo.jpg'; // Importing logo image
import backgroundImage from '../../images/t.jpg'; // Importing background image
import { useReactToPrint } from 'react-to-print';

const InventoryDashboard = () => {
    // State and refs initialization
    const [inventory, setInventory] = useState([]); // State for inventory items
    const [loading, setLoading] = useState(false); // State for loading status
    const [error, setError] = useState(null); // State for error message
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const componentRef = useRef(); // Ref for component

    // Function to fetch inventory items based on search query
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8076/inventory?search=${searchQuery}`
            );
            setInventory(response.data.data); // Update inventory state with fetched data
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error("Error fetching Inventory Items:", error);
            setError(
                "An error occurred while fetching the inventory for the search query."
            );
            setLoading(false);
        }
    };

    // Effect hook to fetch inventory items on component mount
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8076/inventory")
            .then((response) => {
                setInventory(response.data.data); // Update inventory state with fetched data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // // Function to generate PDF
    // const generatePDF = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: 'Inventory List',
    //     onAfterPrint: () => alert('Data saved in PDF'),
    // });

    // Function to apply search filter to inventory items
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

    // Filtered inventory based on search query
    const filteredInventory = inventory.filter(applySearchFilter);

    // Alert when quantity of any item is below 15
    useEffect(() => {
        const itemsBelow15 = filteredInventory.filter(item => item.Quantity <= 15);
        if (itemsBelow15.length > 0) {
            const itemNamesList = itemsBelow15.map(item => `<li>${item.Name}</li>`).join('');
            Swal.fire({
                icon: "warning",
                title: "Warning",
                html: `Quantity of the following items are at a low level<ul>${itemNamesList}</ul>`,
            });
        }
    }, [filteredInventory]);

    // Function to handle delete item
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
    // Inline styles for components
    const styles = {
        container: {
            color: 'black',
            border: '3px solid white',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        },
        navButton: {
            backgroundColor: 'red',
            color: 'white',
            padding: '0.5rem 2rem',
            borderRadius: '5px',
            width: '220px',
            textDecoration: 'none',
            height: '50px',
            marginTop: '15px'
        },
        logo: {
            width: '100%',
            height: '200px',
            border: '2px solid red'
        },
        table: {
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            background: 'lightgray',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Arial, sans-serif',
            color: '#fff',
        },
        tableHead: {
            background: '#333',
            color: 'red',
            textAlign: 'center',
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
            borderLeft: '1px solid red', // Adding left border
            borderRight: '1px solid red',
            background: '#1f1f1f',
            color: 'white',
        },
        subHeading: {
            marginTop: '20px',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#fff',
            textAlign: 'center',
            textTransform: 'uppercase',
        },
    };

    return (
        <div style={styles.container} className="p-4" ref={componentRef}>
            <div className="sb-nav-fixed">
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    <a className="navbar-brand ps-3" href="/">Nadeeka Auto Care</a>
                    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                        <div className="input-group">
                            <input className="form-control" type="text" value={searchQuery} placeholder="Search for..." aria-label="Search for..." onChange={(e) => setSearchQuery(e.target.value)} aria-describedby="btnNavbarSearch" />
                            <button className="btn btn-primary" id="btnNavbarSearch" onClick={handleSearch} type="button"><i className="fas fa-search"></i></button>
                        </div>
                    </form>
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Activity Log</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav-link">
                                    <div className="sb-nav-link-icon">
                                        <img src={logo} alt="Nadeeka Auto Logo" style={styles.logo} />
                                        <button
                                            onClick={() => { window.location.href = '/inventory/create' }}
                                            style={styles.navButton}>
                                            Add New Items
                                        </button>
                                       


                                        <div
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                                            style={styles.navButton}
                                        >
                                            <InventoryReport filteredInventory={filteredInventory} />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        {loading ? (<Spinner />) : (
                            <main>
                                <div className="">
                                    <h1 style={styles.subHeading}>Inventory Dashboard</h1>
                                    <div className="">
                                        <div className='' ref={componentRef}>
                                            <table className='' style={styles.table}>
                                                <thead style={styles.tableHead}>
                                                    <tr>
                                                        <th style={styles.tableHeader}>No</th>
                                                        <th style={styles.tableHeader}>Name</th>
                                                        <th style={styles.tableHeader}>Location</th>
                                                        <th style={styles.tableHeader}>Quantity</th>
                                                        <th style={styles.tableHeader}>Purchased Price</th>
                                                        <th style={styles.tableHeader}>Sell Price</th>
                                                        <th style={styles.tableHeader}>Supplier Name</th>
                                                        <th style={styles.tableHeader}>Supplier Phone</th>
                                                        <th style={styles.tableHeader}>Operations</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredInventory.map((inventoryItem, index) => (
                                                        <tr key={inventoryItem._id} className="h-8" style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                                            <td style={styles.tableCell}>{index + 1}</td>
                                                            <td style={styles.tableCell}>{inventoryItem.Name}</td>
                                                            <td style={styles.tableCell}>{inventoryItem.Location}</td>
                                                            <td style={{ ...styles.tableCell, color: inventoryItem.Quantity <= 15 ? 'red' : 'white' }}>{inventoryItem.Quantity}</td>
                                                            <td style={styles.tableCell}>{inventoryItem.PurchasedPrice}</td>
                                                            <td style={styles.tableCell}>{inventoryItem.SellPrice}</td>
                                                            <td style={styles.tableCell}>{inventoryItem.SupplierName}</td>
                                                            <td style={styles.tableCell}>{inventoryItem.SupplierPhone}</td>
                                                            <td style={styles.tableCell}>
                                                                <div className='flex justify-center gap-x-4'>
                                                                    <Link to={`/inventory/get/${inventoryItem._id}`}>
                                                                        <BsInfoCircle className='text-2x1 text-green-800' />
                                                                    </Link>
                                                                    <Link to={`/inventory/edit/${inventoryItem._id}`}>
                                                                        <AiOutlineEdit className='text-2x1 text-yellow-600' />
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
                                        </div>
                                    </div>
                                </div>
                            </main>
                        )}
                        <footer className="py-3 bg-dark mt-auto px-1">
                            <div className="container-fluid px-5">
                                <div className="d-flex align-items-center justify-content-between small text-white">
                                    <div>
                                        &copy; {new Date().getFullYear()} Nadeeka Auto Care
                                    </div>
                                    <div>
                                        <a href="#">Privacy Policy</a> &middot; <a href="#">Terms &amp; Conditions</a>
                                    </div>
                                </div>
                            </div>
                        </footer>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryDashboard;
