import React from 'react';
import logo from '../images/logo.jpg';
import ServiceHistoryReport from '../pages/ServiceHistory/ServiceHistoryReport';

function SidebarS() {
  // Remove the unused state variable 'service'
  const [service, setservice] = React.useState([]);
  const styles = {
    navButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '0.8rem 3rem',
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
    }
  };

  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav-link">
            <div className="sb-nav-link-icon">
              <img src={logo} alt="Nadeeka Auto Logo" style={styles.logo} />
              <button
                onClick={() => { window.location.href = '/vehicle/create' }}
                style={styles.navButton}
              >
                Add Vehicle
              </button>
              <button
                onClick={() => { window.location.href = '/vehicle/dashboard' }}
                style={styles.navButton}
              >
                All Vehicles
              </button>
              <button
                onClick={() => { window.location.href = '/servicehistory/create' }}
                style={styles.navButton}
              >
                Add History
              </button>
              <button
                onClick={() => { window.location.href = '/servicehistory/dashboard' }}
                style={styles.navButton}
              >
                View History
              </button>
              <div style={styles.navButton}>
                {/* Pass appropriate props to ServiceHistoryReport */}
                <ServiceHistoryReport filteredServiceHistories={service} />
              </div>
            </div>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Operation manager
        </div>
      </nav>
    </div>
  );
}

export default SidebarS;
