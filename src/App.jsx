import { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const account = new Account(client);

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUserId(urlParams.get('userId'));
    setSecret(urlParams.get('secret'));
    console.log('URL Params:', { userId: urlParams.get('userId'), secret: urlParams.get('secret') });
  }, []);

  const handleReset = async () => {
    try {
      await account.updateRecovery(userId, secret, newPassword);
      setMessage('Password reset successful! Return to the app to log in.');
    } catch (error) {

      console.error('Reset error:', error); // Log full error object
      setMessage(`Error: ${error.message}`);
     
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Full viewport height
        backgroundColor: '#f0f2f5', // Light gray background
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff', // White card background
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          width: '100%',
          maxWidth: '400px', // Limit width for better readability
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#1a73e8', // Blue header color
          }}
        >
          Reset Your Password
        </h1>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1a73e8', // Blue button
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1557b0')} // Darker blue on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = '#1a73e8')}
        >
          Reset Password
        </button>
        {message && (
          <p
            style={{
              marginTop: '1rem',
              color: message.includes('Error') ? '#d32f2f' : '#2e7d32', // Red for error, green for success
              fontSize: '0.9rem',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;