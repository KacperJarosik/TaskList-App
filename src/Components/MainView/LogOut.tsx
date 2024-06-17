import {useNavigate} from 'react-router-dom';
//  Importing icon
// @ts-ignore
import logout from "../Assets/wylogowanie.png";

// Handling a logout action
function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data here, e.g., localStorage or session
        localStorage.removeItem('userToken'); // Example, depends on how you store user data

        // Redirect to login/signup page
        navigate('../');
    };

    // Displaying a logout button
    return (
        <div onClick={handleLogout} className="LogOutContainer">
            <img src={logout} alt="Wylogowanie" className="LogOutIcon"/>
            <p>Wyloguj się</p>
        </div>
    );
}

export default LogOut;
