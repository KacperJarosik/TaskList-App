import React from "react";
import "../Components/LoginSignup/AfterLogin.css";
// import TestDatabase from '../../testDatabase'
import AppLogo from "../Components/MainView/AppLogo.tsx";
import NavigationBar from "../Components/MainView/NavigationBar.tsx";
import LogOut from "../Components/MainView/LogOut.tsx";
import SettingsView from "./SettingsView.jsx";
import NavigationBarInSettings from "../Components/MainView/NavigationBarInSettings.tsx";
const Settings = () => {
  return (
    <>
      <div className="leftSide">
        <div className="AppLogo">
          <AppLogo />
        </div>

        <div className="NavigationBar2">
          <NavigationBarInSettings />
        </div>

        <div className="LogOut">
          <LogOut />
        </div>
        <div className="SettingsView">
          <SettingsView />
        </div>
      </div>

    </>
  );
};

export default Settings;
