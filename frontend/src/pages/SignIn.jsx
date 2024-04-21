import { Alert, Button } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
const SignIn = () => {
  const [formData, setFormData] = useState(
      {
        erpu: '',
        password: '',
      }
    );
    const { loading } = useSelector(state => state.user);
    const { error } = useSelector(state => state.user);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const naviate = useNavigate();
    const dispatch = useDispatch()


    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    console.log(formData)
    const handleFormSubmit = async(e)=>{
        e.preventDefault();      
        console.log(Object.keys(formData))
        if(
          Object.values(formData).some(value => value === '')
        ){
          alert("All field's are necessary!");
          return;
        }
        
        
        // setLoading(true);
        try {
          dispatch(signInStart())  
          const response = await fetch("/api/v1/auth/login", {
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
            dispatch(signInFailure(data.message))
            // setError(data.message);
            return;
          }
          console.log(data)
          if(data.success){
            dispatch(signInSuccess(data.data))
            naviate('/dashboard');
            // setError(null);
          }
        
        } 
        catch (error) {
            dispatch(signInFailure(error.message));
            setError(error.message);
        }
    }
    return (
    <div className="min-h-screen text-black bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md w-full sm:max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In Page</h2>
        {
          error && (
            <Alert color='failure' className='mt-5 bg-red-500 text-white mb-2 p-2'>
              {error}
            </Alert>
          )
        }
        <form className="space-y-4" onSubmit={handleFormSubmit}>
         
          <div>
            <label 
            htmlFor="username" 
            className="block pl-2 text-sm font-medium text-gray-700">
            Unique Identifier
            </label>
            <input 
                onChange={handleInputChange}
                type="text" 
                id="erpu" 
                placeholder='email or rollNumber or phone or username'
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>       

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
                onChange={handleInputChange}
                type="password" 
                id="password" 
                placeholder='************'
                className="mt-1 py-2 pl-6 rounded-full block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          
          <div>
            <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 rounded-lg focus:outline-none focus:shadow-outline">Sign In
            </Button>
          </div>
        </form>
        <p className="mt-2"> Didn't have an account ? <span className="italic text-blue-800"> <Link to={'/register'}> Register Here </Link></span></p>
      </div>
    </div>  
    );
};
    

export default SignIn

