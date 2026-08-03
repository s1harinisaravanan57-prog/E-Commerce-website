import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter the username and password');
      return;
    }
    try {
      const res = await api.post('/auth/register', { username, password, email });
      if (res.data.success) {
        setMessage('Registration successful. You can now login.');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMessage(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {message && <div className="auth-message">{message}</div>}
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <label>Email (optional)</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <div style={{marginTop: '12px'}}>
        Already have an account? <button className="link-like" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Register;
