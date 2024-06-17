import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
import AppLogo from '../Components/MainView/AppLogo.tsx'
import NavigationBar from '../Components/MainView/NavigationBar.tsx'
import LogOut from '../Components/MainView/LogOut.tsx';
import UserMenu from '../Components/MainView/UserMenu.tsx';
import OpinionsView from './OpinionsView.jsx';
import SayHello from "../Components/MainView/SayHello.tsx";
import CategoriesView from "./CategoriesView.jsx";
import { useTheme } from '../ThemeContex.js'; // Importujemy hook do użycia tematu

const Opinions = () => {
    const { isDarkMode } = useTheme(); // Pobieramy stan trybu z hooka

    // View of reports/opinions info
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

            <div className={`centerSide ${isDarkMode ? 'dark' : 'light'}`}>
                <div className={`SayHello ${isDarkMode ? 'dark' : 'light'}`}>
                    <div className="Blank">
                        <SayHello/>
                    </div>
                </div>

                <div className={`TasksList ${isDarkMode ? 'dark' : 'light'}`}>
                    <OpinionsView/>
                </div>
            </div>

            <div className={`rightSide ${isDarkMode ? 'dark' : 'light'}`}>
                <div className={`UserMenu ${isDarkMode ? 'dark' : 'light'}`}>
                    <UserMenu/>
                </div>
                <div className={`CategoriesView ${isDarkMode ? 'dark' : 'light'}`}>
                    <CategoriesView/>
                </div>
            </div>
        </>
    )
}

export default Opinions
