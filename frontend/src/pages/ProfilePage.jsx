import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  updateUserSuccess,
  signOutSuccess,
  updateUserStart,
  updateUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const {error, setError } = useState('')
  const {loading, setLoading } = useState(null)
  const [disable, setDisable] = useState(false)
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleSubmit = ()=>{

  }
  const handleImageChange = (e) => {
  };

  const handleChange = (e) => { 
    
  };

  console.log(formData)
  const handleDeleteUser = async () => {    
  };
  const handleSignout = async () => {
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response?.json();
      if (!response.ok) {
        console.log('failed')
        return;
      }
      if(data.success){
        dispatch(signOutSuccess());
        navigate('/sign-in');

      }
    } 
    catch (error) {
        console.log(error)
    }     
  };
  const handleInputChange = (e)=>{
    setFormData({...formData, [e.target.id] : e.target.value});  
  };
  const handleFormSubmit = async(e)=>{
    e.preventDefault();       
    dispatch(updateUserStart())
    try {
      const response = await fetch(`/api/v1/user/update-account-details`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response?.json();
  
      if (!response.ok) {
        dispatch(updateUserFailure(data.message))
        alert(data.message)      
        return;
      }
      if(data.success){ 
        dispatch(updateUserSuccess(data.data)) 
        alert(data.message)
    
      }

    } 
    catch (error) {
      alert(error.message)
        // setLoading(false)
        // setError(error.message);
    } 
}

  return (
    <div className='max-w-3xl m-5 rounded-3xl mx-auto p-5 w-full bg-gray-200 text-black'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Update Profile</h1>
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
            <label htmlFor="fullName" className="block pl-2 text-sm font-medium text-gray-700">Full Name</label>
            <input 
                onChange = {handleInputChange}
                defaultValue = {currentUser.fullName}
                type="text" 
                id="fullName" 
                className="mt-1 py-2 pl-6 rounded-full block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="username" className="block pl-2 text-sm font-medium text-gray-700">Username</label>
            <input 
                onChange = {handleInputChange}
                defaultValue = {currentUser.username}
                type="text" 
                id="username" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="email" className="block pl-2 text-sm font-medium text-gray-700">Email</label>
            <input 
                onChange = {handleInputChange}
                defaultValue={currentUser.email}
                type="email" 
                id="email" 
                className="mt- pl-6 rounded-full 1 py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="phone" className="block pl-2 text-sm font-medium text-gray-700">Phone</label>
            <input 
                onChange = {handleInputChange}
                defaultValue = {currentUser.phone}
                type="tel" 
                id="phone" 
                className="mt-1  pl-6 rounded-full py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block pl-2 text-sm font-medium text-gray-700">Roll Number</label>
            <input 
                onChange = {handleInputChange}
                defaultValue = {currentUser.rollNumber}
                type="text" 
                id="rollNumber" 
                className="mt-1 pl-6 rounded-full  py-2 block w-full  border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="yearOfJoining" className="block pl-2 text-sm font-medium text-gray-700">Year of Joining</label>
            <input 
                onChange = {handleInputChange}
                defaultValue = {currentUser.yearOfJoining}
                type="text" 
                id="yearOfJoining" 
                className="mt pl-6 rounded-full py-2 block w-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
            <select 
                onChange = {handleInputChange}
                defaultValue = {currentUser.branch}
                id="branch" 
                className="mt-1 py-2 block w-full pl-6 rounded-full rounded-e-2xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <option value="CSE">NA</option>
              <option value="CSE">CSE</option>
              <option value="MAE">MAE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <Button
            onClick={()=>{
              navigate('/update-password')
            }} 
            className='text-white bg-red-600 text-2xl'> Update Password </Button>
     
          <Button
          className='text-white bg-blue-600 text-2xl'
          type='submit'      
      
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5 px-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}