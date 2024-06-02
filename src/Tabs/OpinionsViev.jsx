import React, { useState } from 'react';
import "../Components/LoginSignup/AfterLogin.css"

const OpinionsViev = () => {
    const [opinion, setOpinion] = useState('');

    const handleSendClick = () => {
        setOpinion('');
    };

    return (
        <div className='back'>
            <h3 className="back">Podziel się z nami swoją opinią</h3>
            <form className="opinion-form">
                <input
                    type="text"
                    className="opinion-input"
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                />
                <button
                    className="AddButton"
                    type="button"
                    onClick={handleSendClick}
                >
                    Wyślij
                </button>
            </form>
        </div>
    );
};

export default OpinionsViev;
