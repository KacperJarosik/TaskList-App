import React from 'react'
import "../Components/LoginSignup/AfterLogin.css";
// import TestDatabase from '../../testDatabase'
import AppLogo from '../Components/MainView/AppLogo.tsx'
import NavigationBar from '../Components/MainView/NavigationBar.tsx'
import LogOut from '../Components/MainView/LogOut.tsx';
import SayHello from "../Components/MainView/SayHello.tsx";
import TasksList from "../Components/MainView/TasksList.tsx";
import CategorisViev from './CategorisViev.jsx';
import { Task } from '../Classes.js';
import TaskInCat from './TaskVievInCategories.jsx';
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
                    <TaskInCat>
                        
                    </TaskInCat>
                </div>
            </div>


        </>
    )
}

export default Categories