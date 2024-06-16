import React, { useEffect } from 'react';
import "./AfterLogin.css";
import AppLogo from '../MainView/AppLogo.tsx';
import NavigationBar from '../MainView/NavigationBar.tsx';
import LogOut from '../MainView/LogOut.tsx';
import SayHello from "../MainView/SayHello.tsx";
import TasksList from "../MainView/TasksList.tsx";
import UserMenu from "../MainView/UserMenu.tsx";
import CategoriesList from "../MainView/CategoriesList.tsx";
import TaskManager from '../../Structs/TaskManager.js'; // Assuming TaskManager.js contains your TaskManager class
import CategorisViev from '../../Tabs/CategorisViev.jsx';

export const AfterLogin = () => {
    useEffect(() => {
        TaskManager.loadFromStorage(); // Dane testowe
    }, []); // Empty dependency array ensures the effect runs only once after mount

    return (
        <>
            <div className="leftSide">
                <div className="AppLogo">
                    <AppLogo/>
                </div>
            </div>
            <div className="centerSide">
                <div className="CategorisViev">
                    <CategorisViev/>
                </div> 

                <div className="NavigationBar">
                    <NavigationBar></NavigationBar>
                </div>  

            </div>
        </>
    );
};
