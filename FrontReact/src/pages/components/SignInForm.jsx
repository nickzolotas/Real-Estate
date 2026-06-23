import React, { useState } from "react";
import Input from "./Input.jsx";
import "./style/SignInForm.css";

export default function SignInForm({ onSignup }) {
    // 1. States για τα στοιχεία και τα μηνύματα
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // 2. Η συνάρτηση σύνδεσης
    const handleLogin = async (e) => {
        e.preventDefault(); // Αποτρέπει το reload
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5000/api/node/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Απέτυχε η σύνδεση");
            }

            setSuccess(data.message);
            console.log("Συνδέθηκες επιτυχώς! Data χρήστη:", data);
            
            // Εδώ αποθηκεύεις αν θες το ID ή το Role στο localStorage
            // localStorage.setItem("userId", data.userId);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-form">
            <h2>Σύνδεση</h2>
            <br />

            {/* Συνδέουμε το email state */}
            <Input 
                labelText="e-mail" 
                className="inp" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            {/* Συνδέουμε το password state και βάζουμε type="password" */}
            <Input 
                labelText="Κωδικός" 
                className="inp" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            {/* Μηνύματα λάθους/επιτυχίας */}
            {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
            {success && <p style={{ color: "green", fontSize: "14px", textAlign: "center" }}>{success}</p>}

            <div className="signInbtn">
                {/* Προσθήκη onClick για να τρέχει η συνάρτηση */}
                <button className="signinbutton" onClick={handleLogin}>
                    <b>Σύνδεση</b>
                </button>

                <p onClick={onSignup} style={{ cursor: "pointer" }}>
                    <b>Εγγραφή</b>
                </p>
            </div>
        </div>
    );
}