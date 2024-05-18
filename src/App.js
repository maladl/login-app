import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [helloMessage, setHelloMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendUrl}/login`, { username, password });
      if (response.data === 'login enabled') {
        setLoginSuccess(true);
        fetchHelloMessage();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const fetchHelloMessage = async () => {
    try {
      const response = await axios.get(`${backendUrl}/hello`);
      setHelloMessage(response.data);
    } catch (err) {
      setError('An error occurred while fetching the hello message.');
    }
  };

  if (loginSuccess) {
    return (
      <div className="App">
        <h1 style={{ color: 'blue' }}>{helloMessage}</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
