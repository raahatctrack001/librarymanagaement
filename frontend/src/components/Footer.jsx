// Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGit, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="footer-section flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-4 ">Company</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#" className="hover:text-gray-400">Services</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-4">Resources</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-4">Connect</h2>
            <ul className="space-y-2 flex gap-4 items-center">
              <li><a href="#" className="hover:text-gray-400"><FaFacebook className='size-6' /></a></li>
              <li><a href="#" className="hover:text-gray-400"><FaTwitter className='size-6' /></a></li>
              <li><a href="#" className="hover:text-gray-400"><FaInstagram className='size-6'/></a></li>
              <li><a href="#" className="hover:text-gray-400"><FaGithub className='size-6' /></a></li>
              <li><a href="#" className="hover:text-gray-400"><FaLinkedin className='size-6' /></a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="text-lg font-semibold mb-4">Feedback</h2>
            <form className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1" htmlFor="name">Name</label>
                <input className="text-black  w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" type="text" id="name" />
              </div>
              <div>
                <label className="block mb-1" htmlFor="email">Email</label>
                <input className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" type="email" id="email" />
              </div>
              <div>
                <label className="block mb-1" htmlFor="feedback">Feedback</label>
                <textarea className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" id="feedback" rows="4"></textarea>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">Submit Feedback</button>
            </form>
          </div>
        </div>
        <hr className="my-8 border-t border-gray-800" />
        <div className="text-sm text-center">&copy; 2024 Library Management System. All rights reserved. @Er. Khan</div>
      </div>
    </footer>
  );
};

export default Footer;
