import Input from "./Input.jsx";
import "./style/SignUpForm.css";

export default function SignUpForm({ onLogin}) {
    return (
        <div className={"login-form"}>
            <h2>Εγγραφή</h2>
            <br />

            <Input labelText="Όνομα" className="inp" />
            <br />

            <Input labelText="Επίθετο" className="inp" />
            <br />

            <Input labelText="e-mail" className="inp" />
            <br />

            <Input labelText="Τηλέφωνο" className="inp" />
            <br />

            <Input labelText="Κωδικός" className="inp" />
            <br />

            <Input labelText="Επανάληψη Κωδικού" className="inp" />
            <br />

            <div className="signUpbtn">
                <button className="signupbutton"><b>Εγγραφή</b></button>
                <p onClick={onLogin}><b>Σύνδεση</b></p>
            </div>
        </div>
    );
}
