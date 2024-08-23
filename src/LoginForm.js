import React, { useState } from "react";
import axios from "axios";
import './LoginForm.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './store';

const LoginForm = ({ handleLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
  
    try {
      const response = await axios.post('http://localhost:8001/login', { email, password });
      if (response.status === 200) {
        const userData = response.data.user;
        dispatch(loginSuccess(userData)); // Ensure dispatch is called with correct data
        onClose();
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setError(`Error: ${error.response ? error.response.data.error : 'Server error'}`);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
