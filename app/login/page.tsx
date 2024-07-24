'use client'

import { useState, FormEvent } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const endpoint = useMagicLink ? '/auth/magic-link' : '/auth/login';
    const body = JSON.stringify({ email, ...(useMagicLink ? {} : { password }) });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Expires': '0',
      },
      body,
    });

    if (response.ok) {
      if (useMagicLink) {
        setMessage('Check your email for the magic link.');
      } else {
        // Redirect to a protected page or homepage after successful login
        window.location.href = '/';
      }
    } else {
      // Handle login failure
      const errorData = await response.json();
      setError(errorData.error || 'Failed to log in');
    }
  };

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {!useMagicLink && (
            <>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
          >
            {useMagicLink ? 'Send Magic Link' : 'Login'}
          </button>
        </form>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <div className="text-center mt-4">
          <button onClick={() => setUseMagicLink(!useMagicLink)} className="text-blue-500 hover:underline">
            {useMagicLink ? 'Login with Password' : 'Login with Magic Link'}
          </button>
        </div>
        <div className="mt-6">
          <button
            onClick={() => handleOAuthLogin('discord')}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-2"
          >
            Login with Discord
          </button>
        </div>
        <div className='mt-1'>
          <button
            onClick={() => handleOAuthLogin('google')}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
