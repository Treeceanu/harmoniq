import React from 'react';
import { useTheme } from './ThemeContext';
import { Switch, FormControlLabel } from '@mui/material';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          color="primary"
        />
      }
      label={isDarkMode ? "Dark Mode" : "Light Mode"}
      labelPlacement="end"
    />
  );
};

export default ThemeToggleButton;
