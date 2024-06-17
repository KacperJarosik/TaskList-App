import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeContex'; // Importujemy hook do użycia tematu
//  Importing icon
// @ts-ignore
import logout from "../Assets/wylogowanie.png";

// Handling a logout action
function LogOut() {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const handleLogout = () => {
        // Clear user data here, e.g., localStorage or session
        localStorage.removeItem('userToken'); // Example, depends on how you store user data

        // Redirect to login/signup page
        navigate('../');
    };

    // Dostosowywanie klasy w zależności od trybu
    const containerClassName = `LogOutContainer ${isDarkMode ? 'dark' : 'light'}`;

    // Displaying a logout button
    return (
        <div onClick={handleLogout} className={`LogOutContainer ${isDarkMode ? 'dark' : 'light'}`}>
            <img src={logout} alt="Wylogowanie" className={`LogOutIcon ${isDarkMode ? 'dark' : 'light'}`}/>
            <p>Wyloguj się</p>
        </div>
    );
}

export default LogOut;
