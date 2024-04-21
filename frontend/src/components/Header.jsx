// Header.jsx
import React from 'react';
import { FaCodeBranch, FaMailchimp, FaMoon, FaPhone, FaSearch } from 'react-icons/fa'
import { TextInput, Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiCog, HiCurrencyDollar, HiLogout, HiMail, HiViewGrid } from "react-icons/hi";



// import { Dropdown } from "flowbite-react";

export function Component() {
  return (
    <Dropdown label="Dropdown">
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
      </Dropdown.Header>
      <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
      <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

const Header = () => {
  const { currentUser } = useSelector(state=>state.user);
  console.log(currentUser)
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
        <button className="h-12 w-14 px-5 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600">
          <FaMoon />
        </button>
        {
          currentUser ? 
          (<Dropdown className='p-2 bg-teal-100 rounded-3xl' label={currentUser?.username} arrowIcon={false}>
            <Dropdown.Header>
              <span className="block font-semibold">{currentUser?.fullName}</span>
              {/* <span className="block text-black font-semibold">{currentUser?.rollNumber}</span> */}
              <span className="block truncate text-sm font-medium">{currentUser?.email}</span>
            </Dropdown.Header>
            <Dropdown.Divider className='border-b-2 border-black' />
            <Dropdown.Item  className='pl-1' icon={HiMail}>{currentUser?.email}</Dropdown.Item>
            <Dropdown.Item  className='pl-1' icon={FaCodeBranch}> {currentUser?.branch} </Dropdown.Item>
            <Dropdown.Item  className='pl-1' icon={FaPhone}>{currentUser?.phone}</Dropdown.Item>
            <Dropdown.Divider className='border-b-2 border-black' />
            <Dropdown.Item  className='pl-1' icon={HiLogout}>Sign out</Dropdown.Item>            
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
