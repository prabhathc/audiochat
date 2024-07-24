'use client'

export default function Home() {
  const handleSignOut = async () => {
    console.log('Attempting to log out');
    try {
      const response = await fetch(`/auth/logout?timestamp=${new Date().getTime()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to log out', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div>logged in</div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
