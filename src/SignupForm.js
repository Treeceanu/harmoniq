import { IconButton } from "@mui/material";
import React, { useState } from "react";
import './SignupForm.css';
import axios from "axios";

const SignupForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      
      console.log("before response");
      const response = await axios.post('http://localhost:8001/signup', {
        username,
        email,
        password,
      });
      console.log("after response", response);
      
      // onClose();
      alert(response.data);
    } catch (error) {
       console.log(`Error: ${error.response ? error.response.data : 'Server error'}`);
    }
    
   
    console.log("Username:", username, "Email:", email, "Password:", password);
    
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
            Email: 
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </IconButton>
      </form>
    </div>
  );
};

export default SignupForm;
