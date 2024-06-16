import React, { useEffect } from 'react';
import "./AfterLogin.css";
import AppLogo from '../MainView/AppLogo.tsx';
import NavigationBar from '../MainView/NavigationBar.tsx';
import LogOut from '../MainView/LogOut.tsx';
import SayHello from "../MainView/SayHello.tsx";
import TasksList from "../MainView/TasksList.tsx";
import UserMenu from "../MainView/UserMenu.tsx";
import CategoriesList from "../MainView/CategoriesList.tsx";
import TaskManager from '../../Structs/TaskManager.js';
import { useTheme } from '../../ThemeContex.js';

export const AfterLogin = () => {
    useEffect(() => {
        TaskManager.loadFromStorage();
    }, []);

    const { isDarkMode, toggleTheme } = useTheme();

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
                    <SayHello/>
                </div>
                <div className={`TasksList ${isDarkMode ? 'dark' : 'light'}`}>
                    <TasksList/>
                </div>
            </div>
            <div className={`rightSide ${isDarkMode ? 'dark' : 'light'}`}>
                <div className={`UserMenu ${isDarkMode ? 'dark' : 'light'}`}>
                    <UserMenu/>
                </div>
                <div className={`CategoriesList ${isDarkMode ? 'dark' : 'light'}`}>
                    <CategoriesList/>
                </div>
            </div>
        </>
    );
};
