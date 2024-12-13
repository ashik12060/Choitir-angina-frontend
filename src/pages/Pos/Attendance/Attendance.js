import React, { useState } from 'react';

function Attendance() {
  const [timeIn, setTimeIn] = useState('12:40 PM');
  const [timeOut, setTimeOut] = useState('00:00:00');

  const handleSignIn = () => {
    setTimeIn(new Date().toLocaleTimeString());
  };

  const handleSignOut = () => {
    setTimeOut(new Date().toLocaleTimeString());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Shop Attendant</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Time In</span>
            <span className="mt-1 text-lg font-semibold text-green-600">{timeIn}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Time Out</span>
            <span className="mt-1 text-lg font-semibold text-red-600">{timeOut}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            SIGN IN
          </button>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            SIGN OUT
          </button>
        </div>

        <button
          className="w-full mt-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Attendance;
