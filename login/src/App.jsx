import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  console.log('App render. isLoggedIn:', 'user:');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
               setIsLoggedIn ? (
                <Navigate to="/profile" replace /> ) : (
                <Navigate to="/login" replace /> )
            } />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          <Route
            path="/register"
            element={<Register />} />
          <Route
            path="/profile"
            element={setIsLoggedIn ? <Profile user={user} /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
