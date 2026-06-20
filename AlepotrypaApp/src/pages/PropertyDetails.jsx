import { useState } from 'react';
import { Slider, RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
// import { Slider } from "@/components/ui/slider"
import "./styles/PropertyDetails.css";
import Item from "./components/Item.jsx";
import MenuIcon from './components/MenuIcon.jsx';
import HomeIcon from './components/HomeIcon.jsx';
import ProfileIcon from './components/ProfileIcon.jsx';
import StarIcon from './components/StarIcon.jsx';
// import AddIcon from './components/AddIcon.jsx'

import logo from "../assets/logoW.png";
import bathroom from "../assets/icons/bathroom.png";
import bed from "../assets/icons/bed.png";
import build from "../assets/icons/build.png";
import distance from "../assets/icons/distance.png";
import stairs from "../assets/icons/stairs.png"

import demoImg from "../assets/demoHome.jpg"

export default function PropertyDetails() {
    return(
        <div className="propertyD">
            <div className="details-top-bar">
                <div className='details-left'>
                    <HomeIcon />
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Αλεπότρυπα</h1>
                </div>
                <div className='right'>
                    {/* <AddIcon onClick="" className="btn"/> */}
                    <StarIcon onClick="" className="btn" />
                    <ProfileIcon onClick="" className="btn"/>
                </div>
                
            </div>
            
            
            <div className="details">
                <div className='details-l'>
                    <div className="detailsImage">
                        <img src={demoImg} alt="Μεγάλη εικόνα 1" style={{ gridArea: 'img1' }} />
                        <img src={demoImg} alt="Μικρή εικόνα 2" style={{ gridArea: 'img2' }} />
                        <img src={demoImg} alt="Μικρή εικόνα 3" style={{ gridArea: 'img3' }} />
                    </div>
                    <div className='detailsTitle'>
                        <h1>Μονοκατοικία 850m<sup>2</sup></h1>
                        <h1>Price: 100.000€</h1>
                    </div>
                    <div className='container-detailsText'>
                        <h2>Περιγραφή</h2>
                        <div className='detailsText'>
                            <p>Αυτή η πολυτελής μονοκατοικία 2 επιπέδων βρίσκεται στην υπέροχη περιοχή της Φιλοθέης και είναι
                                διαθέσιμη προς πώληση. Η συνολική της επιφάνεια είναι 650 τ.μ. και βρίσκεται σε οικόπεδο 850 τ.μ. 
                                Αποτελείται από 5 υπνοδωμάτια, 5 σαλόνια, 5 κουζίνες, 5 μπάνια και ένα WC. Η κατασκευή της
                                ολοκληρώθηκε το 2010 και διαθέτει ενεργειακή κλάση Α. 

                                Επίσης, διαθέτει θέρμανση fan coil, θέα σε
                                ανοιχτό ορίζοντα, κουφώματα αλουμινίου, πόρτα ασφαλείας, ανελκυστήρα, πάρκινγκ, αποθήκη
                                150 τ.μ., κήπο, jacuzzi, πισίνα, A/C, συναγερμό, ηλεκτρικές συσκευές, σίτες, τριπλά τζάμια, ηλιακό
                                θερμοσίφωνα, BBQ, Roof Garden, δορυφορική κεραία, θυροτηλεόραση, νυχτερινό ρεύμα και εσωτερική
                                σκάλα. 

                                Αυτή η μοναδική ιδιοκτησία προσφέρει όχι μόνο πολυτέλεια, αλλά και όμορφη θέα και πλήρη 
                                εξυπηρέτηση των αναγκών σας.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='details-r'>
                    <div className='small-details'>
                        <div className='line'>
                            <img src={bed} alt="" />
                            <p>Υπνοδωμάτια: </p>
                            <span>value</span>
                        </div>
                        <div className='line'>
                            <img src={bathroom} alt="" />
                            <p>Υπνοδωμάτια: </p>
                            <span>value</span>
                        </div>
                        <div className='line'>
                            <img src={build} alt="" />
                            <p>Υπνοδωμάτια: </p>
                            <span>value</span>
                        </div>
                        <div className='line'>
                            <img src={distance} alt="" />
                            <p>Υπνοδωμάτια: </p>
                            <span>value</span>
                        </div>
                        <div className='line'>
                            <img src={stairs} alt="" />
                            <p>Υπνοδωμάτια: </p>
                            <span>value</span>
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                    <div className='offer'>
                        <h2>Με ενδιαφέρει αυτό το ακίνητο</h2>
                        <br></br>
                        <label>Μήνυμα</label>
                        <br></br>
                        <textarea placeholder="Γράψτε το μήνυμά σας εδώ..."></textarea>
                        <br></br>
                        <button className='com'>Αποστολή Μηνύματος</button>
                        <button className='com'>Κλήση</button>
                        <br></br>
                        <br></br>
                  
    
                        <label>Εναλλακτικά</label>
                        <br />
                        <div className="recommend-row">
                            <div className="recommend-slider">
                                <Slider
                                    progress
                                    defaultValue={100000}
                                    onChange={(value) => {
                                        console.log('Προτεινόμενη τιμή:', value);
                                    }}
                                    
                                />
                            </div>
                            <button className='rec-price'>Προτείνετε Τιμή</button>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br></br>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.053079529941!2d11.559118422846963!3d48.17664122404365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e767c569b4b6b%3A0x95c6ccbd78126988!2sBMW%20Museum!5e1!3m2!1sen!2sgr!4v1781747139934!5m2!1sen!2sgr" width="100%" height="300" style={{border: 0}} allowFullScreen="" loading="lazy"></iframe> */}
                    <iframe
  src="https://www.google.com/maps?q=48.176641,11.559118&z=19&t=k&output=embed"
  width="100%"
  height="300"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
/>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.9370870232424!2d11.416468620300304!3d48.78309132388336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479efe394890503b%3A0x79f4784b4298e3c!2sAuto-Union-Stra%C3%9Fe%2C%2085057%20Ingolstadt-Nordwest%2C%20Germany!5e0!3m2!1sen!2sgr!4v1781746136449!5m2!1sen!2sgr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                </div>
            </div>
        </div>
    );
}