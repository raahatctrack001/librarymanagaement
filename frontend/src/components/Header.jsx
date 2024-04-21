// Header.jsx
import React, { useDebugValue, useState } from 'react';
import { FaCodeBranch, FaExchangeAlt, FaIdCard, FaInfo, FaMailchimp, FaMoon, FaPhone, FaSearch, FaSignOutAlt, FaSun } from 'react-icons/fa'
import { TextInput, Dropdown, ThemeModeScript } from 'flowbite-react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiCog, HiCurrencyDollar, HiLogout, HiMail, HiViewGrid } from "react-icons/hi";
import { signOutSuccess } from '../redux/user/userSlice';
import { toggleTheme } from '../redux/theme/themeSlice.js';




const Header = () => {
  const { theme } = useSelector(state => state.theme)
  console.log(theme)
  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleSignOut = async()=>{   
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
  }

  const handleUpdatePassword = ()=>{

  }
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 py-5 bg-gray-800 text-white">
      <div className="flex my-auto items-center">
        <div className="text-lg font-bold">Library Management System</div>
        <div className="md:ml-4 mt-4 md:mt-0">
          <TextInput
            type="text"
            placeholder="Search..."
            className="px-3 py-1 w-full md:w-auto border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-4">
        <button 
        className="h-12 w-14 px-5 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
        onClick={()=>dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        {
          currentUser ? 
          (<Dropdown className='p-2 bg-black text-white rounded-3xl' label={currentUser?.username} arrowIcon={false}>
            <Link to={'/dashboard'}>
              <Dropdown.Header>
                <span className="block font-semibold">{currentUser?.fullName}</span>
                {/* <span className="block text-black font-semibold">{currentUser?.rollNumber}</span> */}
                <span className="block truncate text-sm font-medium">{currentUser?.email}</span>
              </Dropdown.Header>
            </Link>
            <Dropdown.Divider className='border-b-2 border-white' />
            <Dropdown.Item  className='pl-1' icon={HiMail}>{currentUser?.email}</Dropdown.Item>
            <Dropdown.Item  className='pl-1' icon={FaCodeBranch}> {currentUser?.branch} </Dropdown.Item>
            <Dropdown.Item  className='pl-1' icon={FaPhone}>{currentUser?.phone}</Dropdown.Item>
            <Link to={'/l-card'} >
              <Dropdown.Item  className='pl-1' icon={FaIdCard}>Library Card</Dropdown.Item>
            </Link>
            <Dropdown.Divider className='border-b-2 border-white' />
          
            <Link to={'/profile'}>
              <Dropdown.Item className='pl-1' icon={FaInfo}>Update Profile</Dropdown.Item>            
            </Link>
            <Dropdown.Item onClick={handleSignOut} className='pl-1' icon={HiLogout}>Sign out</Dropdown.Item>            
          </Dropdown>) : 
          (            
        <Link to={'/sign-in'}>
          <button className="h-12 w-18 px-4 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-600">
            Sign In
          </button>
        </Link>
          )
        }
        <nav className="text-lg font-semibold">
          <ul className="flex space-x-4">
            <li><Link  to={"/"} className="hover:text-blue-300">Home</Link></li>
            <li><Link  to={"/about"} className="hover:text-blue-300">About</Link></li>
            <li><Link  to={"/projects"} className="hover:text-blue-300">Projects</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
