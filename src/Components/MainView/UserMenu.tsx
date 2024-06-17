//  Importing icon
// @ts-ignore
import user from "../Assets/uzytkownik.png"
import React from "react";
function UserMenu() {
    // Displaying user infos
    return (
        <div>
            <img src={user} alt="Użytkownik" className="UserIcon"/>
            <p>Użytkownik</p>
        </div>
    );
}

export default UserMenu;
