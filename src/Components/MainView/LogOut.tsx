import React from "react";
import { useNavigate } from "react-router-dom/dist";


function LogOut() {
    
    const navigate = useNavigate();

    
    function handleLogout(){
        navigate("/");
    }

    return(
        <p onClick={handleLogout}>Wyloguj się</p>
    );
}

export default LogOut;
