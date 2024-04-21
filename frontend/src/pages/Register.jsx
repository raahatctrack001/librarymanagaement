import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    return (
    <div className="min-h-screen py-10 bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md w-full sm:max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Registration Page</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block pl-2 text-sm font-medium text-gray-700">Full Name</label>
            <input 
                type="text" 
                id="fullName" 
                className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="username" className="block pl-2 text-sm font-medium text-gray-700">Username</label>
            <input 
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
                type="tel" 
                id="phone" 
                className="mt-1  pl-6 rounded-full py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block pl-2 text-sm font-medium text-gray-700">Roll Number</label>
            <input 
                type="text" 
                id="rollNumber" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="yearOfJoining" className="block pl-2 text-sm font-medium text-gray-700">Year of Joining</label>
            <input 
                type="text" 
                id="yearOfJoining" 
                className="mt pl-6 rounded-full py-2 block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
            <select 
                id="branch" 
                className="mt-1 py-2 block w-full pl-6 rounded-full rounded-e-2xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <option value="CSE">CSE</option>
              <option value="MAE">MAE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
                type="password" 
                id="password" 
                className="mt-1 py-2 pl-6 rounded-full block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
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

