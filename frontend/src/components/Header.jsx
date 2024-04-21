// Header.jsx
import React from 'react';
import { FaMoon, FaSearch } from 'react-icons/fa'
import { TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom';
const Header = () => {
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
        <Link to={'/sign-in'}>
          <button className="h-12 w-18 px-4 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-600">
            Sign In
          </button>
        </Link>
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
