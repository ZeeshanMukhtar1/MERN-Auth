import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(
        signInFailure({
          message: 'Please fill in all the fields',
        })
      );
      toast.error('Please fill in all the fields');
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/Signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      // after successful login, redirect to home page
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="max-w-lg p-8 mx-auto mt-12 border rounded-lg shadow-md bordbg-white">
      <h1 className="text-3xl font-semibold text-center mb-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex items-center justify-center mt-5">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to="/signup" className="ml-2 text-blue-500">
          Sign Up
        </Link>
      </div>
      <p className="mt-5 text-center text-red-700">
        {error ? error.message || 'Something went wrong' : ''}
      </p>
      <Toaster position="bottom-right" />
    </div>
  );
}
