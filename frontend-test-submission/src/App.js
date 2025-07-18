import React from 'react';
import './App.css';
import { Log } from './log';

function App() {
  const handleClick = async () => {
    try {
      await Log('frontend', 'info', 'ui', 'User clicked log button');
      alert('Log sent successfully!');
    } catch (err) {
      alert('Failed to send log: ' + err.message);
    }
  };

  return (
    <div className="App">
      <h1>AffordMed Frontend Test</h1>
      <button onClick={handleClick}>Send Log</button>
    </div>
  );
}

export default App;
