import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Register = ({ setPage }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        name,
        email,
        password,
      });
      if (response.data.success) {
        // Navigasi ke halaman login menggunakan useNavigate
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Data tidak sesuai mohon ulangi.');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Register</h2>
          {error && <p className="form-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"/>
          </div>
          <button type="submit" className="form-submit">
            Register
          </button>
        </form>
        <div className="mt-4">
          {/* Gunakan navigate untuk kembali ke halaman login */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-700 font-bold">
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
