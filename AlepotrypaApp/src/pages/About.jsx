import { useState } from "react";
import "./styles/About.css";

import logo from "../assets/logoW.png";

export default function About() {
    return (
        <div className="about">
            <div className="inside">
            <div className="logo-header">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Αλεπότρυπα</h1>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div className="about-list">
                <ul>
                    <br></br>
                    <br></br>
                    <h3>Γρήγοροι Σύνδεσμοι</h3>
                    <br></br>
                    <ul>
                        <ul><a href="/" style={{ textDecoration: 'none'}}>Αρχική Σελίδα</a></ul>
                        <ul>Αγαπημένα</ul>
                        <ul>Ρυθμίσεις</ul>
                    </ul>
                </ul>

                <ul>
                    <br></br>
                    <br></br>
                    <h3>Ακίνητα</h3>
                    <br></br>
                    <ul>
                        <ul><a href="/SearchResults">Κατοικίες</a></ul>
                        <ul>Επαγγελματικοί χώροι</ul>
                        <ul>Χώροι πάρκινγκ</ul>
                    </ul>
                </ul>
                <ul>
                    <br></br>
                    <br></br>
                    <h3>Για Ιδιώτες</h3>
                    <br></br>
                    <ul>
                        <ul>Καταχώρηση Ακινήτου</ul>
                        <ul>Εγγραφή/Είσοδος</ul>
                        <ul>Επικοινωνία</ul>
                    </ul>
                </ul>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <p>Copyright © Alepotrypa 2026</p>
            </div>
        </div>
    );
}