// src/ProfileComponent.js
import React, { useState } from "react";
import "./ProfileComponent.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {  IconButton } from "@mui/material";
import Modal from "react-modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Box from "@mui/material/Box";
import { Avatar } from '@mui/material';
import { useDispatch } from "react-redux";
import { logout } from "./store";
import { useTheme } from "./ThemeContext";
import ThemeToggleButton from './ThemeToggleButton';



Modal.setAppElement("#root"); // For accessibility, set the root element

function ProfileComponent({ isVisible, onClose, user }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const {toggleTheme} = useTheme();

  const openModal = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={`profile-overlay ${isVisible ? "profile-visible" : ""}`}>
      <div className="profile-content">
        <IconButton className="close-button" onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>

        <h1>Profile</h1>
        {user ? (
          <div className="profile-details">
            <Avatar > </Avatar >
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </Box>
            <IconButton className="logout-button" onClick={() => dispatch(logout())}>Logout</IconButton>
            <ThemeToggleButton />
          </div>
        ) : (
          <div className="buttons-container">
            <IconButton
              onClick={() => openModal(true)}
              className="login-button"
            >
              Login
            </IconButton>
            <IconButton
              onClick={() => openModal(false)}
              className="signup-button"
            >
              Sign Up
            </IconButton>
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel={isLogin ? "Login Modal" : "Signup Modal"}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <IconButton onClick={closeModal} className="modal-close-button">
            X
          </IconButton>
          {isLogin ? (
            <LoginForm onClose={closeModal} />
          ) : (
            <SignupForm onClose={closeModal} />
          )}
        </Modal>
      </div>
    </div>
  );
}

export default ProfileComponent;