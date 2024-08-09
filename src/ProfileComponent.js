import React, { useState } from 'react';
import './ProfileComponent.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

Modal.setAppElement('#root'); // For accessibility, set the root element

function ProfileComponent({ isVisible, onClose }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openModal = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={`profile-overlay ${isVisible ? 'profile-visible' : ''}`}>
      <div className="profile-content">
        <IconButton className="close-button" onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        
        <h1>Profile</h1>
        <IconButton onClick={() => openModal(true)} className="login-button">
          Login
        </IconButton>
        <IconButton onClick={() => openModal(false)} className="signup-button">
          Sign Up
        </IconButton>
        
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
          {isLogin ? <LoginForm onClose={closeModal} /> : <SignupForm onClose={closeModal} />}
        </Modal>
      </div>
    </div>
  );
}

export default ProfileComponent;
