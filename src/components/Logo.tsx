import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Logo: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <Link to="/" className="flex items-center justify-start px-4 py-3">
      <img
        src={theme === 'dark' ? '/assets/logos/dark/logo.svg' : '/assets/logos/light/logo.svg'}
        alt="Creo Solutions"
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
};

export default Logo; 