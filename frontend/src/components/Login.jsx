import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('walletAddress', data.walletAddress);
        localStorage.setItem('username', data.username);
        navigate('/profile');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-blue-600 py-4 text-center">
        <h1 className="text-white text-4xl font-bold">facebook</h1>
      </div>

      {/* Login Section */}
      <div className="flex flex-col items-center mt-12">
        {/* Login Box */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-96">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
            Log in to Facebook
          </h2>
          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md focus:outline-none"
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-4">
            <a
              href="/"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgotten password?
            </a>
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="text-center">
            <a
              href="/"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Create New Account
            </a>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            <a href="/" className="hover:underline">
              Create a Page
            </a>{' '}
            for a celebrity, band, or business.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
