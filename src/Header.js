import React from 'react';
import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum'
import { IconButton } from '@mui/material';


function Header() {
  return (
    <div className='header'>
        <IconButton>
            <PersonIcon fontSize='large' className='header__icon' />
        </IconButton>
        <img 
            className='header_logo'
            src='\spen.png'
            alt=''
        />
        <IconButton>
            <ForumIcon fontSize='large' className='header__icon'/>
        </IconButton>
    </div>
  )
}

export default Header