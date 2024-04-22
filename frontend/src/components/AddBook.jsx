import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import {  useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


export default function AddBook() {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filePickerRef = useRef()

  const [formData, setFormData] = useState(
        {
            title: '',
            isbn: '',
            topic: '',
            author: '',
            branchSpecific: '',
            availableCopies: '',
            totalCopies: '',
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    
    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    console.log(formData)
    const handleFormSubmit = async(e)=>{
        e.preventDefault();       
        setError(null);
        setSuccess(null); 
        console.log(Object.keys(formData))
        if(
            Object.values(formData).some(value => value === '')
        ){
            alert("All field's are necessary!");
            return;
        }

     
        setLoading(true);
        try {
          const response = await fetch("/api/v1/book/add-book", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          const data = await response?.json();
          // console.log(data.message)
          // // // console.log(data)
          if (!response.ok) {
            setError(data.message);
            return;
          }
          if(data.success){
            setSuccess(data.message);
            alert(data.message)
            window.location.reload();
            setError(null);
          }
    
        } 
        catch (error) {
            setError(error.message);
        } 
        finally {
          setLoading(false);
        }
    }
    const handleImageChange = ()=>{

    }
  return (
    <div className='max-w-3xl m-5 rounded-3xl mx-auto p-5 w-full bg-gray-200 text-black'>
    <div className='flex flex-col items-center'>
      <h1 className='mt-7 mb-2 text-center font-semibold text-3xl'>Add Book</h1>
      <p className='mb-9'> Enter the details below </p>
    </div>
       {
          error && (
            <Alert color='failure' className='mt-5 bg-red-500 text-white mb-2 p-2'>
              {error}
            </Alert>
          )
        }
        {
          success && (
            <Alert color='failure' className='mt-5 bg-red-500 text-white mb-2 p-2'>
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
            src={currentUser.profilePhoto}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8`}
          />
        </div>     
        <div>
            <label htmlFor="title" className="block pl-2 text-sm font-medium text-gray-700"> Title </label>
            <input 
                onChange = {handleInputChange}              
                type="text" 
                id="title" 
                className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="isbn" className="block pl-2 text-sm font-medium text-gray-700">isbn</label>
            <input 
                onChange = {handleInputChange}           
                type="text" 
                id="isbn" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="author" className="block pl-2 text-sm font-medium text-gray-700">Author</label>
            <input                 
                onChange = {handleInputChange} 
                type="text" 
                id="author" 
                className="mt- pl-6 rounded-full 1 py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="topic" className="block pl-2 text-sm font-medium text-gray-700">Topic</label>
            <input 
                onChange = {handleInputChange}                
                type="tel" 
                id="topic" 
                className="mt-1  pl-6 rounded-full py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="available" className="block pl-2 text-sm font-medium text-gray-700">Available Copies</label>
            <input 
                onChange = {handleInputChange}                
                type="text" 
                id="availableCopies" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="total" className="block pl-2 text-sm font-medium text-gray-700">Total Copies</label>
            <input 
                onChange = {handleInputChange}               
                type="text" 
                id="totalCopies" 
                className="mt pl-6 rounded-full py-2 block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch Specific</label>
            <select 
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
          {loading ? 'Loading...' : 'Add Book'}
        </Button>
      </form>
      
     
      
    </div>
  );
}