import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UpdateBook =  () => {
  const {id} = useParams();

  
  const [flag,setFlag] = useState(false);
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');
  const [input3,setInput3] = useState();
  useEffect(()=>{
    const getData= async ()=>{
      const book = await axios.get(`http://localhost:5555/books/${id}`);
      
      setInput1(book.data.title);
      setInput2(book.data.author);
      setInput3(book.data.publishYear);
    };
    getData();
  },[])
  const clickHandler = async ()=>{
    if(input1===''||input2===''||input3==='') return setFlag(true);
    setFlag(false);
    const newPost = {title:input1,author:input2,publishYear:input3};
    await axios.put(`http://localhost:5555/books/${id}`,newPost);
    console.log('updated successfully');
    window.alert('updated successfully');
  };
  return (
    <div>
      <input type="text" value={input1} onChange={(e)=>setInput1(e.target.value)} placeholder='Enter title of book' className=''/>
      <input type="text" value={input2} onChange={(e)=>setInput2(e.target.value)} placeholder='Enter name of the author'/>
      <input type="text" value={input3} onChange={(e)=>setInput3(e.target.value)} placeholder='Enter publishing year'/>
      <button onClick={clickHandler} className='bg-orange-400'>Done</button>
      <Link to='/'>
        <button className='bg-lime-500'>Go to home page</button>
      </Link>
      <div>
        {flag ? (
          <p>please enter all fields</p>
        ):(<p></p>)}
      </div>
    </div>
  )
}

export default UpdateBook
