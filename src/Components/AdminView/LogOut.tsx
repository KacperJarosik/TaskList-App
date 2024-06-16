// LogOut.tsx
//import React from 'react';
import {useNavigate} from 'react-router-dom';
// @ts-ignore
import logout from "../Assets/wylogowanie.png";

function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data here, e.g., localStorage or session
        localStorage.removeItem('userToken'); // Example, depends on how you store user data
        // Redirect to login/signup page
        navigate('../');
    };

    return (
        <div onClick={handleLogout} className="LogOutContainer">
            <img src={logout} alt="Wylogowanie" className="LogOutIcon"/>
            <p>Wyloguj się</p>
        </div>
    );
}

export default LogOut;
