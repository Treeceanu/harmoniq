// src/Header.js
import React from 'react';
import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
import RecommendIcon from '@mui/icons-material/Recommend';
import { IconButton } from '@mui/material';

function Header({ toggleTab, toggleProfile }) {
  return (
    <div className='header'>
      <IconButton onClick={toggleProfile}>
        <PersonIcon fontSize='large' className='header__icon' />
      </IconButton>
      <img 
        className='header_logo'
        src='/spen.png'
        alt=''
      />
      <IconButton onClick={toggleTab}>
        <RecommendIcon fontSize='large' className='header__icon' />
      </IconButton>
    </div>
  );
}

export default Header;
