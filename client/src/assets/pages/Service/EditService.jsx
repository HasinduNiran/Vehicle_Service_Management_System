import React,{useState, useEffect} from 'react'
import Spinner from '../../components/Spinner';
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom';


const EditService = () => {
  const [Servicename, setname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(()=> {
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
  },[id]);
  const handleEdit = async(e) => {
    e.preventDefault();
    const data ={
      Servicename
    };
    setLoading(true);
    axios
    .put(`http://localhost:8076/Service/${id}`, data)
    .then(()=>{
      setLoading(false);
      navigate('/Service');
    })
    .catch((error)=>{
       setLoading(false);
       console.log(error);
    })
  };
  

  return (
    <>
    <div>
      <div className= 'p-4'>
        <h1 className='text-3xl my-4'>Edit Service details</h1>
        {loading ? <Spinner/>:''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
          <form>
      <div className="mb-3">
      <label for="Servicename" className="form-label">Service Name : </label>
      <input 
      type="text" 
      className="form-control" 
      value={Servicename} 
      onChange={(e)=> setname(e.target.value)} />

        <button type="submit" className="btn btn-primary" onClick={handleEdit}>Submit</button>
        </div>
      </form>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default EditService



