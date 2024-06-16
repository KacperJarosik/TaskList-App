import React, {useEffect} from 'react';
import "./AfterLogin.css";
// Importing necessary components
import AppLogo from '../MainView/AppLogo.tsx';
import NavigationBar from '../MainView/NavigationBar.tsx';
import LogOut from '../MainView/LogOut.tsx';
import SayHello from "../MainView/SayHello.tsx";
import TasksList from "../MainView/TasksList.tsx";
import UserMenu from "../MainView/UserMenu.tsx";
import CategoriesList from "../MainView/CategoriesList.tsx";
import taskManagerInstance from '../../Structs/TaskManager.js'; // Assuming TaskManager.js contains your TaskManager class

export const AfterLogin = () => {
    const fetchCategories = async () => {
        await taskManagerInstance.loadFromFirebase();
      };
    useEffect(() => {
        // TaskManager.loadFromStorage(); // Dane testowe
        fetchCategories(); // Dane testowe

    }, []); // Empty dependency array ensures the effect runs only once after mount

    // Main view of TaskList app
    return (
        <>
            <div className="leftSide">
                <div className="AppLogo">
                    <AppLogo/>
                </div>
                <div className="NavigationBar">
                    <NavigationBar/>
                </div>
                <div className="LogOut">
                    <LogOut/>
                </div>
            </div>
            <div className="centerSide">
                <div className="SayHello">
                    <SayHello/>
                </div>
                <div className="TasksList">
                    <TasksList/>
                </div>
            </div>
            <div className="rightSide">
                <div className="UserMenu">
                    <UserMenu/>
                </div>
                <div className="CategoriesList">
                    <CategoriesList/>
                </div>
            </div>
        </>
    );
};
