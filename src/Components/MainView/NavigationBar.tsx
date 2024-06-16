//import React from "react";
import { useNavigate } from "react-router-dom/dist";
//  Importing icons
// @ts-ignore
import mainView from "../Assets/panel_glowny.png";
// @ts-ignore
import categories from "../Assets/kategorie.png";
// @ts-ignore
// @ts-ignore
import opinions from "../Assets/opinie.png";
// @ts-ignore
import settings from "../Assets/ustawienia.png";
import { useTheme } from "../../ThemeContex";

function NavigationBar() {
    const navigate = useNavigate();

    // Handling a click action and change displaying menu
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
    const { isDarkMode, toggleTheme } = useTheme();

    // Displaying a navigate list
    return (
        <ul className={`list-group ${isDarkMode ? 'dark' : 'light'}`}>
            <li className={`list-group-item ${isDarkMode ? 'dark' : 'light'}`} onClick={handleMainVievClick}><img src={mainView} alt="Panel główny" className={`NavigationBarIcon ${isDarkMode ? 'dark' : 'light'}`}/>Panel
                główny
            </li>
            <li className={`list-group-item ${isDarkMode ? 'dark' : 'light'}`} onClick={handleCategoriesClick}><img src={categories} alt="Kategorie" className={`NavigationBarIcon ${isDarkMode ? 'dark' : 'light'}`}/>Kategorie
            </li>
            {/* <li className="list-group-item" onClick={handleGroupsClick}><img src={groups} alt="Grupy" className="NavigationBarIcon"/>Grupy</li> */}
            <li className={`list-group-item ${isDarkMode ? 'dark' : 'light'}`} onClick={handleOpinionsClick}><img src={opinions} alt="Opinie" className={`NavigationBarIcon ${isDarkMode ? 'dark' : 'light'}`}/>Wyślij
                opinię
            </li>
            <li className={`list-group-item ${isDarkMode ? 'dark' : 'light'}`} onClick={handleSettingsClick}><img src={settings} alt="Ustawienia" className={`NavigationBarIcon ${isDarkMode ? 'dark' : 'light'}`}/>Ustawienia
            </li>
        </ul>
    );
}

export default NavigationBar;
