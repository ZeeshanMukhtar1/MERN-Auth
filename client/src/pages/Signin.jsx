import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {
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
      const res = await fetch('/api/auth/Signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      // after succefull login we wanna redirect to home page, same with signup as well
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="mt-5 text-red-700">{error && 'Something went wrong!'}</p>
    </div>
  );
}
