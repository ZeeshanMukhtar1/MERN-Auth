import React from 'react';

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#2c3e50]">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Auth App</h1>
        <p className="mb-6 text-lg">
          Securely manage your account with our authentication app.
        </p>
        <p className="text-sm text-gray-300">
          Log in or sign up to get started!
        </p>
      </div>
    </div>
  );
}

export default Home;
