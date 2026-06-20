import { useState } from "react";
import "./styles/Login.css";
import Input from "./components/Input.jsx";

import logo from "../assets/logoW.png";

export default function Login() {
    return(
        <>
            <div className='login-background'>
                <div className='login-container'>
                    <div className="logo"><img src={logo}/></div>
                    <div className='login-form'>
                        <h2>Εγγραφή</h2>
                        <br></br>
                        <Input labelText="Όνομα" className="inp"/>
                        <br></br>
                        <Input labelText="Όνομα" className="inp"/>
                        <br></br>
                        <Input labelText="Όνομα" className="inp"/>
                        <br></br>
                        <Input labelText="Όνομα" className="inp"/>
                        <br></br>
                        <Input labelText="Όνομα" className="inp"/>
                        <br></br>
                        <Input labelText="Όνομα" className="inp"/>
                    </div>

                </div >
            </div>
        </>
    );
}