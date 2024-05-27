// @ts-ignore
import logout from "../Assets/wylogowanie.png"

function LogOut() {
    return (
        <div>
            <img src={logout} alt="Wylogowanie" className="LogOutIcon"/>
            <p>Wyloguj się</p>
        </div>
    );
}

export default LogOut;
