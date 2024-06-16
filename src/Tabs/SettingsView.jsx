import React from 'react';
import './SettingsView.css';
import { useTheme } from '../ThemeContex'; // Importujemy funkcję useTheme z kontekstu tematu

const SettingsView = () => {
  // Używamy funkcji useTheme z kontekstu tematu
  const { isDarkMode, toggleTheme } = useTheme();
  

  const handleToggle = () => {
    toggleTheme(); // Wywołujemy funkcję toggleTheme z kontekstu tematu
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className={`toggle-switch ${isDarkMode ? 'toggled' : ''}`} onClick={handleToggle}>
        <div className="toggle-knob"></div>
      </div>
      <div className={`textInSettings ${isDarkMode ? 'dark' : 'light'}`}>
        <div className={`t ${isDarkMode ? 'dark' : 'light'}`}>
          Tryb jasny/ciemny
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
