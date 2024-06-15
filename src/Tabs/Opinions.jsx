import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
// import TestDatabase from '../../testDatabase'
import AppLogo from '../Components/AdminView/AppLogo.tsx'
import NavigationBar from '../Components/AdminView/NavigationBar.tsx'
import LogOut from '../Components/AdminView/LogOut.tsx';
import UserMenu from '../Components/AdminView/UserMenu.tsx';
import CategoriesList from '../Components/AdminView/CategoriesList.tsx';
import OpinionsViev from './OpinionsViev.jsx';
import CategorisViev from './CategorisViev.jsx';

const Opinions = () => {
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
                    <OpinionsViev>
                        
                    </OpinionsViev>
                </div>

            </div>

            <div className="rightSide">
                <div className="UserMenu">
                    <UserMenu/>
                </div>

                <div className="CategorisVievOnRight">
                    <CategorisViev></CategorisViev>
                </div>
            </div>

        </>
    )
}

export default Opinions
