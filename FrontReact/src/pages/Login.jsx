import { useState } from "react";

import "./styles/Login.css";
import SignUpForm from "./components/SignUpForm.jsx";
import SignInForm from "./components/SignInForm.jsx"

import logo from "../assets/logoW.png";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [showSignup, setShowSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Σταματάει το αυτόματο reload της σελίδας
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5000/CheckLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Κάτι πήγε στραβά');
            }

            setSuccessMessage(data.message);
            console.log('Στοιχεία Χρήστη:', data);
            

        } catch (err) {
            setError(err.message);
        }
    };

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
