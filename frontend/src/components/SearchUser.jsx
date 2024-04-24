import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchUser = () => {
  // const { searchTerm } = useParams();
  // console.log(searchTerm)
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ userData, setUserData ] = useState(null);

  
  useEffect(() => {
    setUserData(null);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/user/search-user/${searchTerm}`); // Assuming /api/books is the endpoint for fetching books
        const data = await response?.json();

        if (!response.ok) {
          alert(data.message)
        }
        setUserData(data.data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching books:', error);
        // setError('Failed to fetch books. Please try again later.');
      }
    };

    fetchData();
 
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      {!userData ? <h1 className="text-2xl font-bold mb-4"> No Match Found Yet! </h1> :<h1 className="text-2xl font-bold mb-4">Search User Result</h1> }
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter email or roll number or phone or username or branch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
    
      </div>
      {userData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
          {userData.map((user) => (
            <div key={user.id} className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="bg-gray-700 py-8 text-center">
                <img src={user.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white">{user.username}</h2>
              </div>
              <div className="p-4">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Roll Number:</strong> {user.rollNumber}</p>
                <p><strong>Year of Joining:</strong> {user.yearOfJoining}</p>
                <p><strong>Branch:</strong> {user.branch}</p>
                <p><strong>No of books holding:</strong> {user.bookBank.length}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
