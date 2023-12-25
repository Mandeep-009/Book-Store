import React, {useState,useEffect} from 'react'
import { useAsyncError, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowBook = () => {
  const {id}=useParams();
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [year,setYear] = useState();
  useEffect(()=>{
    const getData= async ()=>{
      const book = await axios.get(`http://localhost:5555/books/${id}`);
      
      setTitle(book.data.title);
      setAuthor(book.data.author);
      setYear(book.data.publishYear);
    };
    getData();
  },[])
  return (
    <div className='flex flex-col justify-center items-center h-screen font-mono'>
      <div>name of book: {title}</div>
      <div>author of book: {author}</div>
      <div>publish year of book: {year}</div>
      <Link to='/'>
        <button className='bg-lime-500'>Go to home page</button>
      </Link>
    </div>
  )
}

export default ShowBook
