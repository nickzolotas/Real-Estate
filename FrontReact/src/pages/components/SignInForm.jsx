import Input from "./Input.jsx";
import "./style/SignInForm.css";

export default function SignInForm({ onSignup }) {
    return (
        <div className="login-form">
            <h2>Σύνδεση</h2>
            <br />

            <Input labelText="e-mail" className="inp" />
            <br />

            <Input labelText="Κωδικός" className="inp" />
            <br />

            <div className="signInbtn">
                <button className="signinbutton">
                    <b>Σύνδεση</b>
                </button>

                <p onClick={onSignup}>
                    <b>Εγγραφή</b>
                </p>
            </div>
        </div>
    );
}