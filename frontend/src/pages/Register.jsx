import { Alert } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState(
        {
            fullName: '',
            username: '',
            email: '',
            phone: '',
            rollNumber: '',
            yearOfJoining: '',
            branch: '',
            password: '',
            confirmPassword: ''
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    
    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const handleFormSubmit = async(e)=>{
        e.preventDefault();        
        console.log(Object.keys(formData))
        if(
            Object.values(formData).some(value => value === '')
        ){
            alert("All field's are necessary!");
            return;
        }

     
        setLoading(true);
        try {
          const response = await fetch("/api/v1/auth/register", {
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
            navigate('/sign-in');
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
    return (
    <div className="min-h-screen py-10 text-black bg-gray-100 flex justify-center items-center">
      <div className="p-8 bg-gray-300 rounded-lg shadow-md w-full sm:max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Registration Page</h2>
        {
          error && (
            <Alert color='failure' className='mt-5 bg-red-500 text-white mb-2 p-2'>
              {error}
            </Alert>
          )
        }
             
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="fullName" className="block pl-2 text-sm font-medium text-gray-700">Full Name</label>
            <input 
                onChange = {handleInputChange}
                type="text" 
                id="fullName" 
                className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="username" className="block pl-2 text-sm font-medium text-gray-700">Username</label>
            <input 
                onChange = {handleInputChange}
                type="text" 
                id="username" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="email" className="block pl-2 text-sm font-medium text-gray-700">Email</label>
            <input 
                type="email" 
                id="email" 
                className="mt- pl-6 rounded-full 1 py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="phone" className="block pl-2 text-sm font-medium text-gray-700">Phone</label>
            <input 
                onChange = {handleInputChange}
                type="tel" 
                id="phone" 
                className="mt-1  pl-6 rounded-full py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block pl-2 text-sm font-medium text-gray-700">Roll Number</label>
            <input 
                onChange = {handleInputChange}
                type="text" 
                id="rollNumber" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="yearOfJoining" className="block pl-2 text-sm font-medium text-gray-700">Year of Joining</label>
            <input 
                onChange = {handleInputChange}
                type="text" 
                id="yearOfJoining" 
                className="mt pl-6 rounded-full py-2 block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
            <select 
                onChange = {handleInputChange}
                id="branch" 
                className="mt-1 py-2 block w-full pl-6 rounded-full rounded-e-2xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <option value="CSE">NA</option>
              <option value="CSE">CSE</option>
              <option value="MAE">MAE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
                onChange = {handleInputChange}
                type="password" 
                id="password" 
                className="mt-1 py-2 pl-6 rounded-full block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
                onChange = {handleInputChange}
                type="password" 
                id="confirmPassword" 
                className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Sign Up</button>
          </div>
        </form>
        <p className="mt-2"> Already have an account ? <span className="italic text-blue-800"> <Link to={'/sign-in'}> Sign In Here </Link></span></p>

      </div>
    </div>  
    );
};
    

export default Register

