import React, { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../../images/t.jpg';


const EditService = () => {
  const [Servicename, setname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8076/Service/${id}`)
      .then((response) => {
        setname(response.data.Servicename);
        setdiscription(response.data.pkgdescription);
        setincludes(response.data.includes);
        setLoading(false);
      }).catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [id]);
  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      Servicename
    };
    setLoading(true);
    axios
      .put(`http://localhost:8076/Service/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/Service/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
  };


  return (
    <>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.heading}>Edit Service details</h1>
          {loading ? <Spinner /> : ''}
          <div >
            <div >
              <form style={styles.form}>
                <div style={styles.formGroup}>
                  <label for="Servicename" style={styles.label}>Service Name </label>
                  <input
                    type="text"
                    style={styles.input}
                    className="form-control"
                    value={Servicename}
                    onChange={(e) => setname(e.target.value)} />

                  <button type="submit" style={styles.button}  onClick={handleEdit}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Fixed backgroundImage syntax
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  formContainer: {
    width: '50%',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    border: '2px solid red', // Add a red border
    margin: '10px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    fontSize: '1.2rem',
    color: 'red',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'black',
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '15px 10px',
  },
};

export default EditService



