import { useState } from "react";
import Input from "./Input.jsx";
import "./style/SignUpForm.css";

export default function SignUpForm({ onLogin }) {
    // 1. States για όλα τα πεδία της φόρμας
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // 2. Η συνάρτηση για την υποβολή της εγγραφής
    const handleSignUp = async (e) => {
        e.preventDefault(); // Αποτρέπει το reload της σελίδας
        setError("");
        setSuccessMessage("");

        // Έλεγχος αν οι κωδικοί είναι ίδιοι
        if (password !== confirmPassword) {
            setError("Οι κωδικοί πρόσβασης δεν ταιριάζουν!");
            return;
        }

        // Αυτόματη παραγωγή username από το email (π.χ. john@gmail.com -> john)
        const userName = email.split("@")[0];

        // Φτιάχνουμε το αντικείμενο με τα δεδομένα που ζητάει η Java
        const userData = {
            name,
            surname,
            email,
            phone,
            password, // Θα γίνει passHash στο backend
            userName,
            role: "B" // Default ρόλος 'B' για Buyer (Αγοραστής)
        };

        try {
            // Στέλνουμε τα δεδομένα στον Node.js (θα φτιάξουμε το endpoint αμέσως μετά)
            const response = await fetch("http://localhost:5000/api/node/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Απέτυχε η εγγραφή");
            }

            setSuccessMessage("Η εγγραφή ολοκληρώθηκε με επιτυχία!");
            
            // Προαιρετικά: Μετά από 2 δευτερόλεπτα γυρνάει τον χρήστη στην οθόνη Login
            setTimeout(() => {
                onLogin();
            }, 2000);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSignUp}>
            <h2>Εγγραφή</h2>
            <br />

            <Input 
                labelText="Όνομα" 
                className="inp" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />

            <Input 
                labelText="Επίθετο" 
                className="inp" 
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <br />

            <Input 
                labelText="e-mail" 
                className="inp" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <Input 
                labelText="Τηλέφωνο" 
                className="inp" 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <br />

            <Input 
                labelText="Κωδικός" 
                className="inp" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <Input 
                labelText="Επανάληψη Κωδικού" 
                className="inp" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />

            {/* Εμφάνιση μηνυμάτων λάθους ή επιτυχίας */}
            {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
            {successMessage && <p style={{ color: "green", fontSize: "14px", textAlign: "center" }}>{successMessage}</p>}

            <div className="signUpbtn">
                <button type="submit" className="signupbutton"><b>Εγγραφή</b></button>
                <p onClick={onLogin} style={{ cursor: "pointer" }}><b>Σύνδεση</b></p>
            </div>
        </form>
    );
}