import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      // after successful login, redirect to home page
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="max-w-lg p-8 mx-auto mt-12 bg-white border rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-slate-700"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-slate-700"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-slate-700"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:bg-slate-800 disabled:opacity-80 focus:outline-none"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex items-center justify-center mt-5">
        <p className="text-gray-600">Already have an account?</p>
        <Link to="/signin" className="ml-2 text-blue-500">
          Sign In
        </Link>
      </div>
      <p className="mt-5 text-center text-red-700">
        {error && 'Something went wrong!'}
      </p>
    </div>
  );
}
