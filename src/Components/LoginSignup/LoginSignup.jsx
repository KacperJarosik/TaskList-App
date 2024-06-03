import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const LoginSignup = () => {
  const [action, setAction, resetPassword] = useState("Zaloguj się");
  const { login, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await login(email, password);
      navigate("/after");
    } catch (error) {
      //setError("Nieprawidłowe dane do logowania. Spróbuj ponownie.");
      alert("Nieprawidłowe dane do logowania. Spróbuj ponownie.");
      console.error("Login failed: ", error.message);
    }
  }

  async function handleSignUp() {
    try {
      await signup(email, password, name);
      navigate("/after");
    } catch (error) {
      //setError("Nieudana rejestracja. Spróbuj ponownie.");
      alert("Nieudana rejestracja. Spróbuj ponownie.");
      console.error("Signup failed: ", error.message);
    }
  }

  function clickSign() {
    setError(""); // Clear error message
    if (action === "Zaloguj się") {
      setAction("Zarejestruj się");
    } else {
      handleSignUp();
    }
  }

  function clickLogin() {
    setError(""); // Clear error message
    if (action === "Zarejestruj się") {
      setAction("Zaloguj się");
    } else {
      handleLogin();
    }
  }

  function handleLostPasswordClick() {
    setAction("Zresetuj hasło");
  }

  function handleReturnToLogin() {
    setAction("Zaloguj się");
  }

  async function handleResetPassword() {
    try {
      await resetPassword(email);
      console.log("Password reset email sent");
      setAction("Zaloguj się");
    } catch (error) {
      //setError("Resetowanie hasła nie powiodło się. Spróbuj ponownie.");
      alert("Resetowanie hasła nie powiodło się. Spróbuj ponownie.");
      console.error("Password reset failed: ", error.message);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Zarejestruj się" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Nazwa użytkownika"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        {(action === "Zaloguj się" || action === "Zarejestruj się" || action === "Zresetuj hasło") && (
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Adres e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {(action === "Zaloguj się" || action === "Zarejestruj się") && (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {action === "Zarejestruj się" && (

          <div className="password-requirement">
            Uwaga! Hasło musi składać się z conajmniej 6 znaków!
          </div>
        )}
        {action === "Zaloguj się" && (
          <div className="forgot-password">
            Zapomniałeś hasła? <span onClick={handleLostPasswordClick}>Kliknij tu!</span>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <div className="submit-container">
          {action === "Zresetuj hasło" && (
            <>
              <div className="submit" onClick={handleReturnToLogin}> Wróć do logowania</div>
              
              <div className="submit" onClick={handleResetPassword}> Zresetuj hasło</div>
            </>
          )}
        </div>
        <div className="submit-container">
          {action !== "Zresetuj hasło" && (
            <>
              <div
                className={action === "Zaloguj się" ? "submit gray" : "submit"}
                onClick={clickSign}
              >
                Zarejestruj się
              </div>
              <div
                className={action === "Zarejestruj się" ? "submit gray" : "submit"}
                onClick={clickLogin}
              >
                Zaloguj się
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
