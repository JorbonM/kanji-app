import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() && password === '1234') {
        
      onLogin(username);
      navigate('/loginhome');
    } else {
      alert('Invalid login. Hint: password is 1234');
    }
  };

  

  return (
    <div style={{ textAlign: 'center', padding: '50px'}}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div>
          <label>Username: </label><br />
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div><br />
        <div>
          <label>Password: </label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;