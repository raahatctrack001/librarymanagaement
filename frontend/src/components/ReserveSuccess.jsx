import React from 'react';

const ReserveSuccess = (props) => { //{one, two} = destructured form (props) is an object to be destructured
    const {bookId: bookData, userId: userData} = props.props;
    console.log('props', props);
    console.log('book', bookData);
    console.log('user', userData);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">User Info</h2>
          {userData && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
              <img src={userData.profilePhoto} alt="Profile" className="h-40 w-full object-cover mb-4" />
              <p>Full Name: {userData.fullName}</p>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>
              <p>Roll Number: {userData.rollNumber}</p>
              <p>Year of Joining: {userData.yearOfJoining}</p>
              <p>Branch: {userData.branch}</p>
              <p>Books in BookBank: {userData.bookBank.length} </p>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Book Info</h2>
          {bookData && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <img src={bookData.photoURL} alt="Book" className="h-40 w-full object-cover mb-4" />
              <p>Title: {bookData.title}</p>
              <p>ISBN: {bookData.isbn}</p>
              <p>Topic: {bookData.topic}</p>
              <p>Author: {bookData.author}</p>
              <p>Branch Specific: {bookData.branchSpecific}</p>
              <p>Available Copies: {bookData.availableCopies}</p>
              <p>Total Copies: {bookData.totalCopies}</p>
              <p>Book Holders count: {bookData.copyHolder.length}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReserveSuccess;
