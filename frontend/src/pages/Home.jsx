// App.jsx
import React from 'react';


const Home = () => {
  return (
    <div className="mx-auto px-8 min-h-screen bg-gray-200 text-gray-800">
      <main>
        <section className="hero text-center py-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to our Library Management System</h2>
          <p className="text-lg text-gray-600">Manage your library with ease and efficiency.</p>
        </section>
        <section className="features grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature">
            <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
            <p className="text-gray-600">User-friendly interface makes navigation a breeze.</p>
          </div>
          <div className="feature">
            <h3 className="text-xl font-bold mb-2">Efficient Management</h3>
            <p className="text-gray-600">Streamline your library operations with powerful management tools.</p>
          </div>
          <div className="feature">
            <h3 className="text-xl font-bold mb-2">Accessible Anywhere</h3>
            <p className="text-gray-600">Access your library system from anywhere, anytime.</p>
          </div>
        </section>
      </main>
      <footer className="py-6 text-center">
        <p className="text-gray-600">&copy; 2024 Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
