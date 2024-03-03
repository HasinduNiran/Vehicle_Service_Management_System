import React,{useState, useEffect} from 'react'
import Spinner from '../../components/Spinner';
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom';


const EditPackage = () => {
  const [pakgname, setname] = useState('');
  const [pkgdescription, setdiscription] = useState('');
  const [includes, setincludes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(()=> {
    setLoading(true);
    axios.get(`http://localhost:8076/Package/${id}`)
    .then((response) => {
       setname(response.data.pakgname);
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
      pakgname,
      pkgdescription, 
      includes
    };
    setLoading(true);
    axios
    .put(`http://localhost:8076/Package/${id}`, data)
    .then(()=>{
      setLoading(false);
      navigate('/');
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
        <h1 className='text-3xl my-4'>Edit Package details</h1>
        {loading ? <Spinner/>:''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
          <form>
      <div className="mb-3">
      <label for="pakgname" className="form-label">Package Name : </label>
      <input 
      type="text" 
      className="form-control" 
      value={pakgname} 
      onChange={(e)=> setname(e.target.value)} />

      <label for="pkgdescription" className="form-label">Package Discription : </label>
      <textarea 
        className="form-control" 
        value={pkgdescription} 
        onChange={(e)=> setdiscription(e.target.value)}/>

     <label for="includes" className="form-label">Package includes : </label>
      <textarea 
        className="form-control" 
        value={includes} 
        onChange={(e)=> setincludes(e.target.value)}/>

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

export default EditPackage



