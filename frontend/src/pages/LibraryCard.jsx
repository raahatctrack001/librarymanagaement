import React from 'react';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';

const LibraryCard = () => {
  const { currentUser } = useSelector(state => state.user)
  const photoHeight = 60;
  const handleDownloadCard = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Add photo section
    const photoWidth = 60;
    const photoHeight = 60;
    const photoX = 105 - (photoWidth / 2);
    const photoY = 50;
    doc.setFillColor(255, 255, 255); // White
    doc.rect(photoX, photoY, photoWidth, photoHeight, 'F');
    // Add user photo
    const img = new Image();
    img.src = currentUser.profilePhoto;
    img.crossOrigin = 'anonymous'; // Add this line to prevent CORS issues
    doc.addImage(img, 'JPEG', photoX, photoY, photoWidth, photoHeight);

    // Add user information
    doc.setTextColor(52, 73, 94); // Dark Blue
    doc.setFontSize(12);
    doc.text(`Full Name: ${currentUser.fullName}`, 20, 130);
    doc.text(`Username: ${currentUser.username}`, 20, 140);
    doc.text(`Email: ${currentUser.email}`, 20, 150);
    doc.text(`Phone: ${currentUser.phone}`, 20, 160);
    doc.text(`Roll Number: ${currentUser.rollNumber}`, 20, 170);
    doc.text(`Year of Joining: ${currentUser.yearOfJoining}`, 20, 180);
    doc.text(`Branch: ${currentUser.branch}`, 20, 190);

    // Save the PDF
    doc.save('library_card.pdf');
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Library Card</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className=" flex items-center justify-center overflow-hidden mb-4">
            {/* User photo */}
            <img src={currentUser.profilePhoto} alt="User" className="h-full w-auto rounded-full" />
          </div>
          <p><strong>Full Name:</strong> {currentUser.fullName}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Phone:</strong> {currentUser.phone}</p>
          <p><strong>Roll Number:</strong> {currentUser.rollNumber}</p>
          <p><strong>Year of Joining:</strong> {currentUser.yearOfJoining}</p>
          <p><strong>Branch:</strong> {currentUser.branch}</p>
        </div>
        <div>
          {/* Button to download library card */}
          <button
            onClick={handleDownloadCard}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Download Library Card (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
