import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
// import TestDatabase from '../../testDatabase'
import AppLogo from '../Components/MainView/AppLogo.tsx'
import NavigationBar from '../Components/MainView/NavigationBar.tsx'
import LogOut from '../Components/MainView/LogOut.tsx';
import CategorisViev from './CategorisViev.jsx';
import TaskInCat from './TaskVievInCategories.jsx';
import UserMenu from '../Components/MainView/UserMenu.tsx';

const Categories = () => {
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
                <div className="CategorisViev">
                    <CategorisViev/>
                </div>
            </div>

            <div className="rightSide">
                <div className="UserMenu">
                    <UserMenu/>
                </div>
            </div>

        </>
    )
}

export default Categories