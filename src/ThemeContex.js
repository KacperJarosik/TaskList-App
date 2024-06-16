import React, { createContext, useState, useContext } from 'react';

// Tworzymy kontekst dla trybu
const ThemeContext = createContext();

// Właściwości dostawcy kontekstu
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hoc do wygodnego używania kontekstu
export const useTheme = () => useContext(ThemeContext);
