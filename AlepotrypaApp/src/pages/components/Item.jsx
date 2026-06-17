import {useState} from "react";

import "./style/Item.css";
import imgDemo from "../../assets/demoHome.jpg"

export default function Item() {
    return (
        <div className="box">
            <div className="img-container">
                <img src={imgDemo} alt="" className="img"/>
            </div>
            <div className="item-info">
                <h1>400€</h1>
                <p>μ<sup>2</sup>: <span className="val">1000</span></p>
                <p>Δωμάτια: <span className="val">20</span></p>
                <p>Όροφος: <span className="val">1</span></p>
                <p>Έτος: <span className="val">2030</span></p>
                <p>Γκαράζ: <span className="val">NAI</span></p>
            </div>
        </div>
    )
}