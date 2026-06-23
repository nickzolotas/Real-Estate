import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input.jsx";
import "./style/SignInForm.css";

export default function SignInForm({ onSignup }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/node/CheckLogin', {
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

            const loggedUser = {
                email,
                role: data.role || 'B',
                userName: data.userName || '',
                userId: data.userId || null
            };
            localStorage.setItem('loggedInUser', JSON.stringify(loggedUser));
            setSuccessMessage(data.message || 'Συνδεθήκατε με επιτυχία!');
            console.log('Στοιχεία Χρήστη από το backend:', data);

            setTimeout(() => {
                navigate('/search');
            }, 800);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h2>Σύνδεση</h2>
            <br />

            {/* Σύνδεση με το state του email */}
            <Input 
                labelText="e-mail" 
                className="inp" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            {/* Σύνδεση με το state του κωδικού και χρήση type="password" */}
            <Input 
                labelText="Κωδικός" 
                className="inp" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            {/* Εμφάνιση μηνυμάτων κάτω από τα Inputs */}
            {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', fontSize: '14px', textAlign: 'center' }}>{successMessage}</p>}

            <div className="signInbtn">
                {/* Το κουμπί έχει πλέον type="submit" για να ενεργοποιεί το onSubmit της φόρμας */}
                <button type="submit" className="signinbutton">
                    <b>Σύνδεση</b>
                </button>

                <p onClick={onSignup} style={{ cursor: 'pointer' }}>
                    <b>Εγγραφή</b>
                </p>
            </div>
        </form>
    );
}