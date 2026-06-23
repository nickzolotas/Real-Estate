import { useState } from "react";
import Input from "./Input.jsx";
import "./style/SignUpForm.css";

export default function SignUpForm({ onLogin }) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState('B');

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setError("Οι κωδικοί πρόσβασης δεν ταιριάζουν!");
            return;
        }

        const userName = email.split("@")[0];

        const userData = {
            name,
            surname,
            email,
            phone,
            password,
            userName,
            role: role === 'S' ? 'S' : 'B'
        };

        try {
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

            <label style={{ color: '#333', fontWeight: '700' }}>Είδος Λογαριασμού</label>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="B"
                        checked={role === 'B'}
                        onChange={() => setRole('B')}
                    />
                    Buyer
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="S"
                        checked={role === 'S'}
                        onChange={() => setRole('S')}
                    />
                    Seller
                </label>
            </div>

            {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
            {successMessage && <p style={{ color: "green", fontSize: "14px", textAlign: "center" }}>{successMessage}</p>}

            <div className="signUpbtn">
                <button type="submit" className="signupbutton"><b>Εγγραφή</b></button>
                <p onClick={onLogin} style={{ cursor: 'pointer' }}><b>Σύνδεση</b></p>
            </div>
        </form>
    );
}
