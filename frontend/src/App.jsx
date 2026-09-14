import { useState, useEffect, useRef } from 'react';  

function App() {
  const [rfidUid, setRfidUid] = useState('');
  
  // Create a ref to the input element to manage focus
  const inputRef = useRef(null);

  // Focus the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    if (!rfidUid.trim()) return;

    alert(`Scanned card number: ${rfidUid}`);

    setRfidUid('');
    inputRef.current?.focus();
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>RFID Attendance System</h1>

      <form onSubmit={handleSubmit} style={{ margin: '30px 0' }}>
        <input
          ref={inputRef}
          type="text"
          value={rfidUid}
          onChange={(e) => setRfidUid(e.target.value)}
          placeholder="Tap RFID here..."
          style={{ padding: '12px', fontSize: '18px', width: '300px', textAlign: 'center' }}
        />
      </form>
    </div>
  );
}

export default App;