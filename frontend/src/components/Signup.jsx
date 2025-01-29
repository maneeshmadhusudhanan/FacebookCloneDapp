import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const connectToMetamask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        console.log('Connected to MetaMask with address:', address);
        return address;
      } else {
        alert('Please install MetaMask');
        return null;
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask.');
      return null;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const address = await connectToMetamask();
    if (!address) return;

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, walletAddress: address }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('walletAddress', data.walletAddress);
        navigate('/login');
      } else {
        setError(data.msg || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Signup failed.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-blue-600 py-6 text-center">
        <h1 className="text-white text-4xl font-bold">facebook</h1>
      </div>

      {/* Signup Section */}
      <div className="flex flex-col items-center mt-12">
        {/* Signup Box */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
            Create a new account
          </h2>
          <p className="text-center text-gray-600 mb-6">
            It’s quick and easy.
          </p>
          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
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
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md focus:outline-none"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">
            By signing up, you agree to our{' '}
            <a href="/" className="text-blue-500 hover:underline">
              Terms
            </a>
            ,{' '}
            <a href="/" className="text-blue-500 hover:underline">
              Data Policy
            </a>{' '}
            and{' '}
            <a href="/" className="text-blue-500 hover:underline">
              Cookie Policy
            </a>
            .
          </p>
        </div>
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
