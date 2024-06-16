import React, { useState } from 'react';
import "../Components/LoginSignup/AfterLogin.css"
import { createOpinion } from '../contexts/DatabaseHandler';
const OpinionsViev = () => {
    const [opinion, setOpinion] = useState('');
    const [opinionTitle,setOpinionTitle] = useState('');
    const [opinionPriority, setOpinionPriority] = useState('');
    const [opinionDetails, setOpinionDetails] = useState('');

    const handleSendClick = async () => {
        console.log("Wchodzi do funkcji: ");
        
            try{
                const userId = localStorage.getItem("uid");
                const submissionDate = new Date().toISOString();
                await createOpinion(userId,opinionTitle,opinionPriority,opinionDetails,submissionDate);
                console.log("wykonala sie funkcja createOpinion: ");
                console.log(submissionDate);
                setOpinionTitle('');
                setOpinionPriority('');
                setOpinionDetails('');
            } catch(error){
                console.error("handleSendClick -> Error sending opinion: ",error);
            }
        setOpinion('');
    };

    return (
        <div className='back'>
            <h3 className="back">Podziel się z nami swoją opinią</h3>
            <form className="opinion-form">
                <input
                    type="text"
                    className="opinion-input"
                    placeholder="Napisz co myślisz..."
                    value={opinionDetails}
                    onChange={(e) => setOpinionDetails(e.target.value)}
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
