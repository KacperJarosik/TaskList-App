import React, { useState } from 'react';
import './SettingsView.css'; // Make sure to create this CSS file

const SettingsView = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
        <div className="toggle-knob"></div>
      </div>
      <div className="darkLight">
        Tryb jasny/ciemny
      </div>
    </div>
  );
};

export default SettingsView;
