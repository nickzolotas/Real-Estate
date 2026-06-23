import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Slider, RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
// import { Slider } from "@/components/ui/slider"
import "./styles/PropertyDetails.css";
// import AddIcon from './components/AddIcon.jsx'

import logo from "../assets/logoW.png";
import bathroom from "../assets/icons/bathroom.png";
import bed from "../assets/icons/bed.png";
import build from "../assets/icons/build.png";
import distance from "../assets/icons/distance.png";
import stairs from "../assets/icons/stairs.png"

import demoImg from "../assets/demoHome.jpg"

export default function PropertyDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const property = location.state?.property;
    const searchFilters = location.state?.searchFilters;

    const handleBack = () => {
        if (searchFilters) {
            navigate('/search', { state: { searchFilters } });
        } else {
            navigate(-1);
        }
    };

    const infoLines = useMemo(() => {
        if (!property) return [];

        const typeLabel = property.listingType === 'RENT' ? 'Ενοικίαση' : 'Πώληση';
        const category = property.parkingSpots != null ? 'Garage/Parking' : property.rooms != null ? 'Επαγγελματικό' : property.bedrooms != null ? 'Σπίτι' : 'Ακίνητο';

        return [
            { label: 'Κατηγορία', value: category },
            { label: 'Τύπος', value: typeLabel },
            { label: 'Περιοχή', value: property.city || '-' },
            { label: 'Διεύθυνση', value: property.address || '-' },
            { label: 'Όροφος', value: property.floor || '-' },
            { label: 'Έτος', value: property.year || '-' },
            { label: 'Έχει ανελκυστήρα', value: property.hasElevator ? 'Ναι' : 'Όχι' }
        ];
    }, [property]);

    if (!property) {
        return (
            <div className="propertyD empty-state">
                <div className="not-found-box">
                    <h2>Δεν βρέθηκε ακίνητο.</h2>
                    <p>Πατήστε επιστροφή για να δείτε τα αποτελέσματα αναζήτησης.</p>
                    <button className="com" onClick={handleBack}>Επιστροφή</button>
                </div>
            </div>
        );
    }

    return(
        <div className="propertyD">
            <div className="details-top-bar">
                <div className="details-left">
                    <button className="btn" onClick={handleBack}>←</button>
                    <h1>Λεπτομέρειες Ακινήτου</h1>
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
                        <h1>{property.title || `${property.city || ''} ${property.address || ''}`}</h1>
                        <h1>Τιμή: {property.price?.toLocaleString('el-GR') || '-'}€</h1>
                    </div>
                    <div className='container-detailsText'>
                        <h2>Περιγραφή</h2>
                        <div className='detailsText'>
                            <p>{property.description || 'Δεν υπάρχει διαθέσιμη περιγραφή για αυτό το ακίνητο.'}</p>
                        </div>
                    </div>
                </div>
                <div className='details-r'>
                    <div className='small-details'>
                        <div className='line'>
                            <img src={bed} alt="" />
                            <p>Υπνοδωμάτια / Θέσεις: </p>
                            <span>{property.bedrooms ?? property.rooms ?? property.parkingSpots ?? '-'}</span>
                        </div>
                        <div className='line'>
                            <img src={bathroom} alt="" />
                            <p>Μπάνια: </p>
                            <span>{property.bathrooms ?? '-'}</span>
                        </div>
                        <div className='line'>
                            <img src={build} alt="" />
                            <p>Εμβαδόν: </p>
                            <span>{property.size ? `${property.size} τ.μ.` : '-'}</span>
                        </div>
                        <div className='line'>
                            <img src={distance} alt="" />
                            <p>Διεύθυνση: </p>
                            <span>{property.address || property.city || '-'}</span>
                        </div>
                        <div className='line'>
                            <img src={stairs} alt="" />
                            <p>Όροφος: </p>
                            <span>{property.floor || '-'}</span>
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