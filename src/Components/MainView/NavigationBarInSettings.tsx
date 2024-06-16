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
import React from "react";
function NavigationBarInSettings() {
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
      {/* <li className="list-group-item" onClick={handleGroupsClick}><img src={groups} alt="Grupy" className="NavigationBarIcon"/>Grupy</li> */}
      <li className="list-group-item" onClick={handleMainVievClick}>
        <img src={mainView} alt="Panel Główny" className="NavigationBarIcon" />
        Panel Główny
      </li>
    </ul>
  );
}

export default NavigationBarInSettings;
