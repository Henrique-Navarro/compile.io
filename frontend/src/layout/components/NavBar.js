import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav>
      <h1>My Website</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </nav>
  );
};

export default Navbar;
