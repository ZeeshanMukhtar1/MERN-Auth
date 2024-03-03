import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Signup for an Account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Username"
            id="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="p-3 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
            type="submit"
          >
            Signup
          </button>
        </form>
        <div>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link className="text-blue-500" to="/signin">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
