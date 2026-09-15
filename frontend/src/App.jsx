import { useState, useEffect, useRef } from 'react';  
import axios from 'axios';

function App() {
  // Navigation State
  const [view, setView] = useState('scan'); // Default to the scan page

  // RFID Scanner State
  const [rfidUid, setRfidUid] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null); // Create a ref to the input element to manage focus

  // Admin Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminUsers, setAdminUsers] = useState(null); // State to hold the logged-in admin users data

  // Focus the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, [view]); // Re-focus the input field whenever the view changes

  const handleScanSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    if (!rfidUid.trim()) return;

    setLoading(true); // Set loading state to true
    setMessage(''); // Clear previous messages
    
    try {
      // Send the RFID UID to the backend
      const response = await axios.post('http://localhost:8000/api/attendance/scan', { rfid_uid : rfidUid });

      setStatus('success');
      setMessage(response.data.message);  
    } catch (error) {
      setStatus('error');

      // There is a question mark because error.response may be undefined if the request fails before reaching the server
      setMessage(error.response?.data?.message || 'An error occurred while processing the request.');
    } finally {
      setLoading(false); // Set loading state to false
      setRfidUid(''); // Clear the input field
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', { email, password });
      setLoginError('');
      setAdminUsers(response.data.user); // Assuming the backend returns a list of users upon successful login
      setEmail('');
      setPassword('');
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>RFID Attendance System</h1>
      <button onClick={() => setView('scan')}>Scanner Mode</button> <button onClick={() => setView('admin')}>Admin Login</button>
      { view === 'scan' && (
        <form onSubmit={handleScanSubmit} style={{ margin: '30px 0' }}>
          <input
            ref={inputRef}
            type="text"
            value={rfidUid}
            onChange={(e) => setRfidUid(e.target.value)} // Update the state with the input value
            placeholder="Tap RFID here..."
            style={{ padding: '12px', fontSize: '18px', width: '300px', textAlign: 'center' }}
          />
        </form>
      )}

      { view === 'admin' && (
        <form onSubmit={handleAdminLogin} style={{ margin: '30px 0' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the state with the input value
            placeholder="Enter email..."
            style={{ padding: '12px', fontSize: '18px', width: '300px', textAlign: 'center' }}
          />
          <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update the state with the input value
            placeholder="Enter password..."
            style={{ padding: '12px', fontSize: '18px', width: '300px', textAlign: 'center' }}
          /> <br></br>
          <button type="submit">Login</button>

          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </form>
      )}

      {/* If loading, display loading message */}
      {loading && <p style={{ color: 'blue' }}>Loading...</p>}

      {message && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: status === 'success' ? '#d4edda' : '#f8d7da',
          color: status === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${status === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          width: 'fit-content',
          margin: '20px auto'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;