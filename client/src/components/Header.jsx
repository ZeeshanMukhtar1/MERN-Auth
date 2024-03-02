import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold">Auth System</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/signin">
            <li>Signin</li>
          </Link>
          <Link to="/signup">
            <li>Signup</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
