import React from 'react'
import "./AfterLogin.css";
// import TestDatabase from '../../testDatabase'
import AppLogo from '../MainView/AppLogo.tsx'
import NavigationBar from '../MainView/NavigationBar.tsx'
import LogOut from '../MainView/LogOut.tsx'
import SayHello from "../MainView/SayHello.tsx";
import TasksList from "../MainView/TasksList.tsx";
import UserMenu from "../MainView/UserMenu.tsx";
import CategoriesList from "../MainView/CategoriesList.tsx";


export const AfterLogin = () => {
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

            {/*<TestDatabase>*/}
            {/*</TestDatabase>*/}
        </>
    )
}
