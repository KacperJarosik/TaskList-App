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
    return (
        <ul className="list-group">
            <li className="list-group-item"><img src={mainView} alt="Panel główny" className="NavigationBarIcon"/>Panel
                główny
            </li>
            <li className="list-group-item"><img src={categories} alt="Kategorie" className="NavigationBarIcon"/>Kategorie
            </li>
            <li className="list-group-item"><img src={groups} alt="Grupy" className="NavigationBarIcon"/>Grupy</li>
            <li className="list-group-item"><img src={opinions} alt="Opinie" className="NavigationBarIcon"/>Wyślij
                opinię
            </li>
            <li className="list-group-item"><img src={settings} alt="Ustawienia" className="NavigationBarIcon"/>Ustawienia
            </li>
        </ul>
    );
}

export default NavigationBar;
