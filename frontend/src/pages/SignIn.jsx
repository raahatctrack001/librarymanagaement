import { Button } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md w-full sm:max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In Page</h2>
        <form className="space-y-4">
         
          <div>
            <label htmlFor="username" className="block pl-2 text-sm font-medium text-gray-700">Username</label>
            <input 
                type="text" 
                id="username" 
                placeholder='email or rollNumber or phone or username'
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>       

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
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

