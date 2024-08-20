import { IconButton } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import './LoginForm.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './store';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      console.log("before response");
      const response = await axios.post('http://localhost:8001/login', {
        email,
        password,
      });
      console.log("after response", response);

      // Assuming the server responds with user data on successful login
      if (response.status === 200) {
        const userData = response.data.user;
        dispatch(loginSuccess(userData));
        onClose();
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setError(`Error: ${error.response ? error.response.data.error : 'Server error'}`);
      console.log(`Error: ${error.response ? error.response.data.error : 'Server error'}`);
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
        <IconButton className="submit-button" type="submit">
          Login
        </IconButton>
      </form>
    </div>
  );
};

export default LoginForm;