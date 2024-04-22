import React, { useState, useEffect } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/v1/user/get-all-users'); // Replace '/api/users' with your actual backend endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUsers(data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  return (
    <div className="all-user-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {error && <div className="error">{error}</div>}
      {users.map((user, index) => (
        <div key={index} className="user-card bg-white shadow-md rounded-lg overflow-hidden">
          <img src={user.profilePhoto} alt="Profile" className="w-full h-40 object-cover object-center rounded-t-lg" />
          <div className="p-4">
            <div className="text-xl font-semibold">{user.fullName}</div>
            <div className="text-gray-600">@{user.username}</div>
            <div className="mt-2">
              <div>Email: {user.email}</div>
              <div>Phone: {user.phone}</div>
              {!user.isAdmin && <div>Roll Number: {user.rollNumber}</div>}
              <div>Year of Joining: {user.yearOfJoining}</div>
              {!user.isAdmin && <div>Branch: {user.branch}</div>}
              {!user.isAdmin && <div>Books Holding: {user.bookBank.length}</div>}
              <div>Role: {user.isAdmin? ('Admin'): ('User')}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
