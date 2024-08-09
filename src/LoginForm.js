import { IconButton } from "@mui/material";
import React, { useState, UseState } from "react";
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
    onClose();
  };
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>   
            Username: 
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>
            Password: 
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
