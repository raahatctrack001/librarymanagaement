import { Alert } from 'flowbite-react';
import React, { useState } from 'react';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    
    setFormData({...formData, [e.target.id]: e.target.value})
  };
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if(
        Object.values(formData).some(value => value === '')
    ){
        alert("All field's are necessary!");
        return;
    }

    // Validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password must match');
      return;
    }

    // Send request to backend to update password
    try {
      const response = await fetch('/api/v1/auth/update-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess('Password updated successfully');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update password');
      }
    } catch (error) {
      setError('Failed to update password');
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md w-full sm:max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password" className="block ml-5 mt-5 text-sm font-medium text-gray-700"> Old Password</label>
        <input 
            onChange = {handleInputChange}
            placeholder='old password'
            type="password" 
            id="oldPassword" 
            className="mt-1 py-2 pl-6 rounded-full block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
        <div>
        <label htmlFor="confirmPassword" className="block ml-5 mt-5 text-sm font-medium text-gray-700">New Password</label>
        <input 
            onChange = {handleInputChange}
            placeholder='new password'
            type="password" 
            id="newPassword" 
            className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
        </div>
        <div>
        <label htmlFor="confirmPassword" className="block ml-5 mt-5 text-sm font-medium text-gray-700">Confirm Password</label>
        <input 
            onChange = {handleInputChange}
            placeholder='confirm password'
            type="password" 
            id="confirmPassword" 
            className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
        </div>
        
        {
          error && (
            <Alert color='failure' className='mt-5 bg-red-500 text-white mb-2 p-2'>
              {error}
            </Alert>
          )
        }
        {success &&  (
            <Alert color='failure' className='mt-5 bg-green-500 text-white mb-2 p-2'>
              {success}
            </Alert>
          )}
        <div>
            <button 
                type="submit" 
                className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">update password</button>
          </div>
      </form>
    </div>
    </div>
    
  );
};

export default UpdatePassword;
