import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // show messages set by other pages (e.g., redirect from checkout)
  React.useEffect(() => {
    const m = localStorage.getItem('authMessage');
    if (m) {
      setMessage(m);
      localStorage.removeItem('authMessage');
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter the username and password');
      return;
    }
    try {
      const res = await api.post('/auth/login', { username, password });
      if (res.data.success) {
        // store token and username
        localStorage.setItem('user', username);
        if (res.data.token) localStorage.setItem('token', res.data.token);
        setMessage('Login successful');
        navigate('/');
      } else {
        setMessage(res.data.message || 'Login failed');
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {message && <div className="auth-message">{message}</div>}
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <div style={{marginTop: '12px'}}>
        New here? <button className="link-like" onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Login;
