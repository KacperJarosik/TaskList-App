import React, { useEffect } from 'react';
import "./AfterLogin.css";
import AppLogo from '../AdminView/AppLogo.tsx';
import NavigationBar from '../AdminView/NavigationBar.tsx';
import LogOut from '../AdminView/LogOut.tsx';
import SayHello from "../AdminView/SayHello.tsx";
import Users from "../AdminView/Users.jsx";
import UserMenu from "../AdminView/UserMenu.tsx";
import CategoriesList from "../AdminView/CategoriesList.tsx";
import TaskManager from '../../Structs/TaskManager.js'; // Assuming TaskManager.js contains your TaskManager class

export const AfterLogin = () => {
    useEffect(() => {
        TaskManager.loadFromStorage(); // Dane testowe
    }, []); // Empty dependency array ensures the effect runs only once after mount

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
                <div className="SayHello">
                    <SayHello />
                </div>
                <div className="TasksList">
                    <Users />
                </div>
            </div>
            <div className="rightSide">
                <div className="UserMenu">
                    <UserMenu />
                </div>
                <div className="CategoriesList">
                    <CategoriesList />
                </div>
            </div>
        </>
    );
};
