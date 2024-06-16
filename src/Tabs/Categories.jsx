import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
import AppLogo from '../Components/MainView/AppLogo.tsx'
import NavigationBar from '../Components/MainView/NavigationBar.tsx'
import LogOut from '../Components/MainView/LogOut.tsx';
import CategoriesView from './CategoriesView.jsx';
import UserMenu from '../Components/MainView/UserMenu.tsx';
import SayHello from "../Components/MainView/SayHello.tsx";
import { useTheme } from '../ThemeContex.js'; // importujemy hook do użycia tematu

const Categories = () => {
    const { isDarkMode } = useTheme(); // pobieramy stan trybu z hooka

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

                <div className={`CategoriesView ${isDarkMode ? 'dark' : 'light'}`}>
                    <CategoriesView/>
                </div>
            </div>

            <div className={`rightSide ${isDarkMode ? 'dark' : 'light'}`}>
                <div className={`UserMenu ${isDarkMode ? 'dark' : 'light'}`}>
                    <UserMenu/>
                </div>
            </div>
        </>
    )
}

export default Categories;
