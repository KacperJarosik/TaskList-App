import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const LoginSignup = () => {
  const [action, setAction, resetPassword ] = useState("Login");
  const { login, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await login(email, password);
      navigate("/after");
    } catch (error) {
      console.error("Login failed: ", error.message);
    }
  }

  async function handleSignUp() {
    try {
      await signup(email, password, name);
      navigate("/after");
    } catch (error) {
      console.error("Signup failed: ", error.message);
    }
  }


  function clickSign() {
    if (action === "Login") {
      setAction("Sign Up");
    } else {
      handleSignUp();
    }
  }

  function clickLogin() {
    if (action === "Sign Up") {
      setAction("Login");
    } else {
      handleLogin();
    }
  }

  function handleLostPasswordClick() {
    setAction("Reset Password");
  }

  function handleReturnToLogin() {
    setAction("Login");
  }

  async function handleResetPassword() {
    try {
      await resetPassword(email);
      console.log("Password reset email sent");
      setAction("Login");
    } catch (error) {
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
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        {(action === "Login" || action === "Sign Up" || action === "Reset Password") && (
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {(action === "Login" || action === "Sign Up") && (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {action === "Login" && (
          <div className="forgot-password">
            Lost Password? <span onClick={handleLostPasswordClick}>Click Here!</span>
          </div>
        )}
        <div className="submit-container">
          {action === "Reset Password" && (
            <>
              <div className="submit">
                <div onClick={handleReturnToLogin}>Return to Login</div>
              </div>
              <div className="submit">
                <div onClick={handleResetPassword}>Reset Password</div>
              </div>
            </>
        )}
        </div>
        <div className="submit-container">
          {action !== "Reset Password" && (
            <>
              <div
                className={action === "Login" ? "submit gray" : "submit"}
                onClick={clickSign}
              >
                Sign Up
              </div>
              <div
                className={action === "Sign Up" ? "submit gray" : "submit"}
                onClick={clickLogin}
              >
                Login
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
