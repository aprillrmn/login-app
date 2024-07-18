import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedInState] = useState(false); // State untuk memantau status login
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (checkLoggedIn === 'true') {
      setIsLoggedInState(true); // Set state isLoggedIn jika sudah login
    } else {
      navigate('/login'); // Arahkan ke halaman login jika belum login
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login Request:', { username, password });
      const response = await axios.post('http://192.168.18.237:8080/api/login', { username, password });
      console.log('Login Response:', response.data);
      const { data } = response;
      if (data.data.success) {
        sessionStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_id', data.data.id);
        localStorage.setItem('token', data.data.token);
        setIsLoggedIn(true);
        setUser(data.data.user);
        navigate('/profile');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Data tidak sesuai, mohon ulangi.');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>
          {error && <p className="form-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <button type="submit" className="form-submit">
            Login
          </button>
        </form>
        <div className="mt-4">
          <p>Belum punya akun?</p>
          <button type="button" onClick={() => navigate('/register')} className="text-blue-500 hover:text-blue-700 font-bold">
            Registrasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
