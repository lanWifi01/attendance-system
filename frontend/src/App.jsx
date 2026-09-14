import { useState, useEffect, useRef } from 'react';  
import axios from 'axios';

function App() {
  const [rfidUid, setRfidUid] = useState('');

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Create a ref to the input element to manage focus
  const inputRef = useRef(null);

  // Focus the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
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

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>RFID Attendance System</h1>

      <form onSubmit={handleSubmit} style={{ margin: '30px 0' }}>
        <input
          ref={inputRef}
          type="text"
          value={rfidUid}
          onChange={(e) => setRfidUid(e.target.value)} // Update the state with the input value
          placeholder="Tap RFID here..."
          style={{ padding: '12px', fontSize: '18px', width: '300px', textAlign: 'center' }}
        />
      </form>

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