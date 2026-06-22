import { useState } from "react";

import "./styles/Login.css";
import SignUpForm from "./components/SignUpForm.jsx";
import SignInForm from "./components/SignInForm.jsx"

import logo from "../assets/logoW.png";

export default function Login() {
    const [showSignup, setShowSignUp] = useState(false);

    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <div className="back">🡸</div>
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>

                    <div className={`forms-wrapper ${showSignup ? "signup" : ""}`}>
                        <SignInForm onSignup={() => { setShowSignUp(true)}}/>
                        <SignUpForm onLogin={() => { setShowSignUp(false)}}/>
                    </div>

                </div>
            </div>
        </>
    );
}
