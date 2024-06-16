import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
import AppLogo from '../Components/MainView/AppLogo.tsx'
import NavigationBar from '../Components/MainView/NavigationBar.tsx'
import LogOut from '../Components/MainView/LogOut.tsx';
import { useTheme } from '../ThemeContex.js'; // importujemy hook do użycia tematu

const Groups = () => {
    const { isDarkMode } = useTheme(); // Pobieramy stan trybu z hooka

    return (
        <>
            <div className={`leftSide ${isDarkMode ? 'dark' : 'light'}`}>
                <div className={`AppLogo ${isDarkMode ? 'dark' : 'light'}`}>
                    <AppLogo/>
                </div>

                <div className={`NavigationBar ${isDarkMode ? 'dark' : 'light'}`}>
                    <NavigationBar/>
                </div>

                <div className={`LogOut ${isDarkMode ? 'dark' : 'light'}`}>
                    <LogOut/>
                </div>
            </div>
        </>
    )
}

export default Groups;
