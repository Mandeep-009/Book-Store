import React , {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const DeleteBook = () => {
  const [loading,setLoading] = useState(false);
  const {id}=useParams();
  useEffect(()=>{
      const  deleteData= async()=>{
        setLoading(true);
        console.log(`id is ${id}`);
        const books = await axios.delete(`http://localhost:5555/books/${id}`);
        console.log('deleted successfully');  
        // setBooks(books.data);
        setLoading(false);
      };
      deleteData();
  },[])
  return (
    <div>
      {loading ? (
          <Spinner />
      ):(
          <p>deleted successfully </p>
      )}
      <Link to='/'>
        <button className='bg-lime-500'>Go to home page</button>
      </Link>
    </div>
  )
}

export default DeleteBook
