import React,{useState} from 'react'
import Spinner from '../../components/Spinner';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';


const CreatePackage = () => {
  const [pakgname, setname] = useState('');
  const [pkgdescription, setdiscription] = useState('');
  const [includes, setincludes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const data ={
      pakgname,
      pkgdescription,
      includes
    };
    setLoading(true);
    axios
    .post(`http://localhost:8076/Package/`, data)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
       setLoading(false);
       console.log(error);
 
    })
  }
  

  return (
    <>
    <div>
      <div classNameName= 'p-4'>
        <h1 classNameName='text-3xl my-4'>Add New Package</h1>
        {loading ? <Spinner/>:''}
        <div classNameName='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div classNameName='my-4'>
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

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default CreatePackage



