import React from 'react';
import '../Components/LoginSignup/AfterLogin.css';

const OpinionsViev = () => {

  return (
    <div className='back'>
      <h3 className="back">Podziel się z nami swoją opinią</h3>
      <form className="opinion-form">
        <input 
          type="text"  
          className="opinion-input"
        />
        <div className='submit-button'>Wyśłij</div>
      </form>
    </div>
  );
};

export default OpinionsViev;
