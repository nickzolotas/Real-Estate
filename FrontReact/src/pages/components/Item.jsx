import React from "react";
import "./style/Item.css";
import imgDemo from "../../assets/demoHome.jpg";

// Δέχεται το prop "data" δυναμικά
export default function Item({ data, onClick, onFavorite, isFavorite }) {
    if (!data) return null;

    return (
        <div className="box item-card" onClick={onClick}>
            <div className="img-container">
                <img src={imgDemo} alt={data.title} className="img"/>
            </div>
            <div className="item-info">
                {/* Εμφάνιση των πραγματικών πεδίων της Java */}
                <h1>{data.price}€</h1>
                <p>Τίτλος: <span className="val">{data.title}</span></p>
                <p>μ<sup>2</sup>: <span className="val">{data.size}</span></p>
                <p>Όροφος: <span className="val">{data.floor}</span></p>
                <p>Έτος: <span className="val">{data.year}</span></p>
                <p>Περιοχή: <span className="val">{data.city}</span></p>
                <button
                    type="button"
                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onFavorite) onFavorite(data);
                    }}
                >
                    {isFavorite ? 'Αγαπημένο' : 'Πρόσθεσε στα αγαπημένα'}
                </button>
            </div>
        </div>
    );
}