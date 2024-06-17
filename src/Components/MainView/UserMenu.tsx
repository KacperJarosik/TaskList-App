//  Importing icon
// @ts-ignore
import user from "../Assets/uzytkownik.png"
import { useTheme } from '../../ThemeContex'; // importujemy hook do użycia tematu


function UserMenu() {
    // Displaying user infos

    const { isDarkMode } = useTheme(); // Pobieramy stan trybu z hooka


    return (
        <div>
            <img src={user} alt={`Użytkownik ${isDarkMode ? 'dark' : 'light'}`} className={`UserIcon ${isDarkMode ? 'dark' : 'light'}`}/>
            <p>Użytkownik</p>
        </div>
    );
}

export default UserMenu;
