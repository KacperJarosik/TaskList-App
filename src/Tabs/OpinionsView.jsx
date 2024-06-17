import React, { useState } from 'react';
import "../Components/LoginSignup/AfterLogin.css"
import { useTheme } from '../ThemeContex';


const OpinionsView = () => {
    const [opinion, setOpinion] = useState('');

    const { isDarkMode, toggleTheme } = useTheme();

    const handleSendClick = () => {
        setOpinion('');
    };

    

    return (
        <div className={`back ${isDarkMode ? 'dark' : 'light'}`}>
            <h3 className={`back ${isDarkMode ? 'dark' : 'light'}`}>Podziel się z nami swoją opinią</h3>
            <form className={`opinion-form ${isDarkMode ? 'dark' : 'light'}`}>
                <input
                    type="text"
                    className={`opinion-input ${isDarkMode ? 'dark' : 'light'}`}
                    placeholder="Napisz co myślisz..."
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                />
                <button
                    className={`AddButton ${isDarkMode ? 'dark' : 'light'}`}
                    type="button"
                    onClick={handleSendClick}
                >
                    Wyślij
                </button>
            </form>
        </div>
    );
};

export default OpinionsView;
