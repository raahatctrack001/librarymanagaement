import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import {  useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookFailure, updateBookStart, updateBookSuccess } from '../redux/book/bookSlice';


export default function UpdateBook() {
  const { bookId } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const { loading, error} = useSelector(state => state.book)
  const [formData, setFormData] = useState({});
    
    const [success, setSuccess] = useState(null);
    const [prevData, setPrevData] = useState({});

    useEffect(async()=>{        
       
        try {
          const response = await fetch(`/api/v1/book/get-book/${bookId}`, {
            method: 'GET',
          });
    
          const data = await response?.json();
         
          if (!response.ok) {            
            alert(data.message)
          }
          if(data.success){  
            setPrevData(data.data)                    
          }    
    
        } 
        catch (error) {
            alert(error.message)
        } 
       
    }, [])
    
    
    
    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    // console.log(formData)
    const handleFormSubmit = async(e)=>{
        e.preventDefault();       
        
        if(Object.keys(formData).length === 0){
          alert('plz make some changes then click update')
          updateBookFailure('no changes made yet')
          return;
        }
        dispatch(updateBookStart())
        try {
          const response = await fetch(`/api/v1/book/update-book/${bookId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          const data = await response?.json();
          if (!response.ok) {
            dispatch(updateBookFailure(data.message))
            alert(data.message)
            return;
          }
          if(data.success){
            setPrevData(data.data)
            dispatch(updateBookSuccess(data.message));
            setSuccess(data.message)
            alert(data.message)
            
          }
    
        } 
        catch (error) {
          dispatch(updateBookFailure(error.message))
          alert(error.message);
        } 
        
    }

    const updateBookImage = async (file)=>{
      dispatch(updateBookStart());
      try {
        dispatch(updateBookStart())
        const res = await fetch(`/api/v1/book/update-book-image/${bookId}`, {
          method:"PATCH",
          body: file,
        });
        
        const updatedBook = await res.json();
        console.log(UpdateBook)
        if(updatedBook.success){ //not res.successs if res the its res.ok()
          dispatch(updateBookSuccess());
          alert(updatedBook.message)
          setSuccess(updatedBook.message)
        }
      } catch (error) {
        alert(error.message);
        dispatch(updateBookFailure(error.message))
        // console.log(error);
      }
    }
    const handleImageChange = (e)=>{
      e.preventDefault();
      const newFormData = new FormData();
      newFormData.append('bookImage', e.target.files[0]);
      updateBookImage(newFormData)
    }
  
  return (
    <div className='max-w-3xl m-5 rounded-3xl mx-auto p-5 w-full bg-gray-200 text-black'>
    <div className='flex flex-col items-center'>
      <h1 className='mt-7 mb-2 text-center font-semibold text-3xl'>Update Book</h1>
      <p className='mb-9'> Enter the details below </p>
    </div>
    {
          loading && (
            <Alert color='failure' className='mt-5 bg-red-500 text-white mb-2 p-2 justify-center'>
              Updating Book Credentials, plz wait...
            </Alert>
          )
        }
       {
          error && (
            <Alert color='failure' className='mt-5 bg-red-500 text-white mb-2 p-2'>
              {error}
            </Alert>
          )
        }
        {
          success && (
            <Alert color='failure' className='mt-5 bg-green-500  text-white mb-2 p-2'>
              {success}
            </Alert>
          )
        }
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>      
      <input
          
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}>
          
            
          <img
            src= {prevData.photoURL}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8`}
          />
        </div>  
        <div>
            <label htmlFor="title" className="block pl-2 text-sm font-medium text-gray-700"> Title </label>
            <input 
                defaultValue={prevData.title}
                onChange = {handleInputChange}              
                type="text" 
                id="title" 
                className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="isbn" className="block pl-2 text-sm font-medium text-gray-700">isbn</label>
            <input 
                defaultValue={prevData.isbn}
                onChange = {handleInputChange}           
                type="text" 
                id="isbn" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="author" className="block pl-2 text-sm font-medium text-gray-700">Author</label>
            <input     
                defaultValue={prevData.author}            
                onChange = {handleInputChange} 
                type="text" 
                id="author" 
                className="mt- pl-6 rounded-full 1 py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="topic" className="block pl-2 text-sm font-medium text-gray-700">Topic</label>
            <input 
                defaultValue={prevData.topic}
                onChange = {handleInputChange}                
                type="tel" 
                id="topic" 
                className="mt-1  pl-6 rounded-full py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="available" className="block pl-2 text-sm font-medium text-gray-700">Available Copies</label>
            <input 
                defaultValue={prevData.availableCopies}
                onChange = {handleInputChange}                
                type="text" 
                id="availableCopies" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="total" className="block pl-2 text-sm font-medium text-gray-700">Total Copies</label>
            <input 
                defaultValue={prevData.totalCopies}
                onChange = {handleInputChange}               
                type="text" 
                id="totalCopies" 
                className="mt pl-6 rounded-full py-2 block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch Specific</label>
            <select 
                defaultValue={prevData.branchSpecific}
                onChange = {handleInputChange}                
                id="branchSpecific" 
                className="mt-1 py-2 block w-full pl-6 rounded-full rounded-e-2xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <option value="CSE">NA</option>
              <option value="CSE">CSE</option>
              <option value="MAE">MAE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>        
         
          <Button
          className='text-white bg-blue-600 text-2xl'
          type='submit'      
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update Book'}
        </Button>
          <Button
            className='text-white e-full bg-blue-600 text-2xl'
            type='button'
            onClick={()=>navigate('/dashboard')}
          >
          Go To Dashboard
          </Button>
        
      </form>
      
     
      
    </div>
  );
}