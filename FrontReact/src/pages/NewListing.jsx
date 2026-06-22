import React from 'react';
import "./styles/NewListing.css";
import Input from "./components/Input.jsx"

import logo from "../assets/logoW.png";

export default function NewListing(){
    return (
        <div className="newListing-background">
            <div className="newListing-container">
                <div className="back">🡸</div>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <div className={"newListing-form"}>
                    <h2>Νέα Αγγελία</h2>
                    <br />
                    <Input labelText="Τίτλος Αγγελίας" className="inp" />
                    <br />

                    <Input labelText="Περιγραφή" isTextArea={true} />
                    <br />

                    <Input labelText="Τετραγωνικά Μέτρα" className="inp" />
                    <br />

                    <Input labelText="Τιμή" className="inp" />
                    <br />

                    <Input labelText="Διεύθυνση" className="inp" />
                    <br />

                    <Input labelText="Όροφος" className="inp" />
                    <br />

                    <Input labelText="Τηλέφωνο" className="inp" />
                    <br />

                    <input type="file" multiple />
                    <br />

                    <div className="submitbtn">
                        <button className="submit"><b>Καταχώρηση Αγγελίας</b></button>
                    </div>
                </div>

            </div>
        </div>
    );
}