'use client'

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = useMagicLink ? '/auth/magic-link' : '/auth/login';
    const body = JSON.stringify({ email, ...(useMagicLink ? {} : { password }) });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!useMagicLink && (
          <>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        <button type="submit">{useMagicLink ? 'Send Magic Link' : 'Login'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <button onClick={() => setUseMagicLink(!useMagicLink)}>
        {useMagicLink ? 'Login with Password' : 'Login with Magic Link'}
      </button>
    </div>
  );
}
