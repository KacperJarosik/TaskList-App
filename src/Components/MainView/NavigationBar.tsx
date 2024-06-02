//import React from "react";
import { useNavigate } from "react-router-dom/dist";

function NavigationBar() {
    const navigate = useNavigate();

    function handleCategoriesClick() {
        navigate("/categories");
    }

    function handleMainVievClick() {
        navigate("/after");
    }

    function handleGroupsClick() {
        navigate("/groups");
    }

    function handleOpinionsClick() {
        navigate("/opinions");
    }

    function handleSettingsClick() {
        navigate("/settings");
    }

    return (
        <ul className="list-group">
            <li className="list-group-item" onClick={handleMainVievClick}>Panel główny</li>
            <li className="list-group-item" onClick={handleCategoriesClick}>Kategorie</li>
            {/* <li className="list-group-item" onClick={handleGroupsClick}>Grupy</li> */}
            <li className="list-group-item" onClick={handleOpinionsClick}>Wyślij opinię</li>
            <li className="list-group-item" onClick={handleSettingsClick}>Ustawienia</li>
        </ul>
    );
}

export default NavigationBar;
