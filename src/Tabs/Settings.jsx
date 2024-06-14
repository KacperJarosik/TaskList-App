import React from "react";
import "../Components/LoginSignup/AfterLogin.css";
// import TestDatabase from '../../testDatabase'
import AppLogo from "../Components/MainView/AppLogo.tsx";
import NavigationBar from "../Components/MainView/NavigationBar.tsx";
import LogOut from "../Components/MainView/LogOut.tsx";
import SettingsView from "./SettingsView.jsx";
const Settings = () => {
  return (
    <>
      <div className="leftSide">
        <div className="AppLogo">
          <AppLogo />
        </div>

        <div className="NavigationBar">
          <NavigationBar />
        </div>

        <div className="LogOut">
          <LogOut />
        </div>
      </div>

      <div className="centerSide">
        <SettingsView />
      </div>
    </>
  );
};

export default Settings;
