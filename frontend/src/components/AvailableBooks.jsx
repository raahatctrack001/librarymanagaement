import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaDocker, FaEllipsisH, FaEllipsisV, FaHelicopter, FaHighlighter, FaOptinMonster } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useResolvedPath } from 'react-router-dom';
import ReserveSuccess from './ReserveSuccess';

const AvailableBooks = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reserveData, setReserveData] = useState({});
  const [userId, setUserId] = useState({});
  const [bookId, setBookId] = useState({});
  const handleOptionSelect = (book) => {
    if (selectedBook && selectedBook.isbn === book.isbn) {
      setSelectedBook(null); // Close dropdown if the same book is clicked again
      setIsDropdownOpen(false);
    } else {
      setSelectedBook(book);
      setIsDropdownOpen(true);
    }
  };

  useEffect(() => {
    setReserveData(null);
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/book/get-available-book'); // Assuming /api/books is the endpoint for fetching books
        const data = await response?.json();

        if (!response.ok) {
          setError(data.message)
        }
        setBooks(data.data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
      }
    };

    fetchData();
 
  }, []);
 
  const handleReserve = async () => {

    const erpu = prompt("Enter UID: Email, Roll, Phone or Username of reserver")

    if(!erpu?.trim()){
      alert("Without UID, we can't reserve this book for you.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/loan/reserve-book/${selectedBook?._id}/${erpu}`,
    {
      method: 'POST'
    });
      const data = await response?.json();
      console.log(data)
      if (!response.ok) {
        alert(data.message);
        return;
        // setError(data.message)
      }

      if(data.success){
        setReserveData(data.data);
        alert(data.message);
        
      }
      // setBooks(data.data);
      // console.log(data)
    } catch (error) {
      alert(error.message)
      // console.error('Error fetching books:', error);
      // setError('Failed to fetch books. Please try again later.');
    } 
  };


  const handleReturn = async ()=>{
    const erpu = prompt("Enter UID: Email, Roll, Phone or Username of returner")

    if(!erpu?.trim()){
      alert("Without UID, we can't reserve this book for you.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/loan/return-book/${selectedBook?._id}/${erpu}`,
    {
      method: 'POST'
    });
      const data = await response?.json();
      
      if (!response.ok) {
        alert(data.message);
        return;
        // setError(data.message)
      }

      if(data.success){
        alert(data.message);
      }
      // setBooks(data.data);
      // console.log(data)
    } catch (error) {
      alert(error.message)
      // console.error('Error fetching books:', error);
      // setError('Failed to fetch books. Please try again later.');
    } 
    console.log('Returning book:', selectedBook);
  }

  const handleDelete = async () => {
    console.log('Deleting book:', selectedBook);
    const erpu = prompt("Enter you UID.")
    try {
      const response = await fetch(`/api/v1/book//delete-book/${selectedBook?._id}/${erpu}`,{
          method: 'DELETE',
        });

      const data = await response?.json();
      console.log(data)
      if (!response.ok) {
        alert(data.message);
        return;
      }

      if(data.success){
        alert(data.message);
        
      }
    } catch (error) {
      alert(error.message)
    } 
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-400">
      <div className='block'>
        {reserveData && <ReserveSuccess props = {reserveData} />}     
      </div>
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        {books.map(book => (
          <div key={book.isbn} className="bg-white rounded-3xl shadow-md p-4 relative hover:bg-gray-300">
            <img src={book.photoURL} alt={book.title} className="h-40 w-full object-cover mb-4" />
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-600 mb-2">Topic: {book.topic}</p>
            <p className="text-gray-600 mb-2">Branch Specific: {book.branchSpecific}</p>
            <p className="text-gray-600 mb-2">Available Copies: {book.availableCopies}</p>
            <p className="text-gray-600 mb-2">Total Copies: {book.totalCopies}</p>
            <p className="text-gray-600 mb-2">Book Holder's Count: {book.copyHolder.length}</p>
            {/* Three dots dropdown */}
           { currentUser?.isAdmin && ( 
            <div className="absolute top-2 right-2">
              <div className="relative">
                <button className="text-gray-600 focus:outline-none" onClick={() => handleOptionSelect(book)}>
                <div className='flex flex-col gap-0'>
                  <span className='font-bold  text-black'> . </span>
                  <span className='font-bold  text-black'> . </span>
                  <span className='font-bold  text-black'> . </span>
                </div>
                </button>
                {/* Dropdown content */}
                {selectedBook && selectedBook.isbn === book.isbn && isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={handleReserve}>
                        Reserve Book
                      </button>

                      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={handleReturn}>
                        Return Book
                      </button>
                      
                      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={handleDelete}>
                        Delete Book
                      </button>

                      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={()=>{
                          navigate(`/update-book/${selectedBook?._id}`)
                        }}>
                        Update Book
                      </button>
                      
                    </div>
                  </div>
                )}
              </div>
            </div>)
           }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableBooks;