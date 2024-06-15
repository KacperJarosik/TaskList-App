//import React from "react";
import { useNavigate } from "react-router-dom/dist";
// @ts-ignore
import mainView from "../Assets/panel_glowny.png";
// @ts-ignore
import categories from "../Assets/kategorie.png";
// @ts-ignore
import groups from "../Assets/grupy.png";
// @ts-ignore
import opinions from "../Assets/opinie.png";
// @ts-ignore
import settings from "../Assets/ustawienia.png";
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
            <li className="list-group-item" onClick={handleMainVievClick}><img src={mainView} alt="Panel główny" className="NavigationBarIcon"/>Panel
                główny
            </li>
            {/*<li className="list-group-item" onClick={handleCategoriesClick}><img src={categories} alt="Kategorie" className="NavigationBarIcon"/>Kategorie*/}
            {/*</li>*/}
             <li className="list-group-item" onClick={handleGroupsClick}><img src={groups} alt="Grupy" className="NavigationBarIcon"/>Użytkownicy</li>
            <li className="list-group-item" onClick={handleOpinionsClick}><img src={opinions} alt="Opinie" className="NavigationBarIcon"/>Zgłoszenia
            </li>
            <li className="list-group-item" onClick={handleSettingsClick}><img src={settings} alt="Ustawienia" className="NavigationBarIcon"/>Ustawienia
            </li>
        </ul>
    );
}

export default NavigationBar;
