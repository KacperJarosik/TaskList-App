import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
// Importing necessary components
import AppLogo from '../Components/MainView/AppLogo.tsx'
import NavigationBar from '../Components/MainView/NavigationBar.tsx'
import LogOut from '../Components/MainView/LogOut.tsx';
import UserMenu from '../Components/MainView/UserMenu.tsx';
import OpinionsView from './OpinionsView.jsx';
import SayHello from "../Components/MainView/SayHello.tsx";
import CategoriesView from "./CategoriesView.jsx";

const Opinions = () => {
    // View of reports/opinions info
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
                    <div className="Blank">
                        <SayHello/>
                    </div>
                </div>

                <div className="TasksList">
                    <OpinionsView/>
                </div>
            </div>

            <div className="rightSide">
                <div className="UserMenu">
                    <UserMenu/>
                </div>
                <div className="CategoriesView">
                    <CategoriesView/>
                </div>
            </div>
        </>
    )
}

export default Opinions
