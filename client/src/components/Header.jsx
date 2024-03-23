import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-[#2c3e50]">
      <div className="flex items-center justify-between max-w-6xl py-4 mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            {!currentUser && (
              <Link to="/signup" className="text-white hover:text-gray-300">
                Signup
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center text-white hover:text-gray-300"
            >
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="object-cover mr-2 rounded-full h-7 w-7"
                />
              ) : (
                <span>Sign In</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
