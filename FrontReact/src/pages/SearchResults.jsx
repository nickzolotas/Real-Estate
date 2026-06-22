import { useState } from 'react';

import "./styles/SearchResults.css";

import Item from "./components/Item.jsx";
import MenuIcon from './components/MenuIcon.jsx';
import HomeIcon from './components/HomeIcon.jsx';
import ProfileIcon from './components/ProfileIcon.jsx';
import StarIcon from './components/StarIcon.jsx';
// import AddIcon from './components/AddIcon.jsx'

import logo from "../assets/logoW.png";

const getConstructionYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);
};


const getFloors = () => {
    const basementLevels = 2;
    const maxFloor = 30;
    const basements = Array.from({ length: basementLevels }, (_, index) => -(basementLevels - index));
    const aboveGround = Array.from({ length: maxFloor + 1 }, (_, index) => index);
    return [...basements, ...aboveGround];
};


const formatFloorLabel = (floor) => {
    return String(floor);
};


export default function SearchResults() {
    const years = getConstructionYears();
    const floors = getFloors();
    const [sqmMin, setSqmMin] = useState('');
    const [sqmMax, setSqmMax] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const generateSqmOptions = (max = 200000) => {
        const opts = [];
        let v = 0;
        while (v <= max) {
            opts.push(v);
            if (v < 300) v += 10;
            else if (v < 1000) v += 50;
            else if (v < 5000) v += 100;
            else if (v < 50000) v += 1000;
            else if (v < 200000) v += 10000;
            else break;
        }
        if (opts[opts.length - 1] < 200000) opts.push(200000);
        return opts;
    };


    const sqmOptions = generateSqmOptions();

    const generatePriceOptions = (max = 100000000) => {
        const opts = [];
        let v = 0;
        while (v <= max) {
            opts.push(v);
            if (v < 1000) v += 100;
            else if (v < 5000) v += 500;
            else if (v < 20000) v += 1000;
            else if (v < 50000) v += 5000;
            else if (v < 100000) v += 10000;
            else if (v < 1000000) v += 50000;
            else if (v < 5000000) v += 100000;
            else if (v < 10000000) v += 500000;
            else if (v < 20000000) v += 1000000;
            else if (v < 50000000) v += 5000000;
            else if (v < 100000000) v += 10000000;
            else break;
        }
        if (opts[opts.length - 1] < 100000000) opts.push(100000000);
        return opts;
    };

    const applySqmPreset = (preset) => {
        if (preset === '50+') { setSqmMin('50'); setSqmMax(''); }
        else if (preset === '100-150') { setSqmMin('100'); setSqmMax('150'); }
        else if (preset === '150+') { setSqmMin('150'); setSqmMax(''); }
        else { setSqmMin(''); setSqmMax(''); }
    };


    const numericMin = sqmMin === '' ? null : Number(sqmMin);
    const filteredMaxOptions = numericMin === null ? sqmOptions : sqmOptions.filter(n => n >= numericMin);


    const onMinChange = (val) => {
        setSqmMin(val);
        if (val === '') return;
        const num = Number(val);
        if (sqmMax !== '' && Number(sqmMax) < num) {
            setSqmMax(val);
        }
    };
    
    // Price range (mirrors sqm logic, but with larger max)
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const priceOptions = generatePriceOptions();
    const numericPriceMin = priceMin === '' ? null : Number(priceMin);
    const filteredPriceMaxOptions = numericPriceMin === null ? priceOptions : priceOptions.filter(n => n >= numericPriceMin);

    const onPriceMinChange = (val) => {
        setPriceMin(val);
        if (val === '') return;
        const num = Number(val);
        if (priceMax !== '' && Number(priceMax) < num) {
            setPriceMax(val);
        }
    };

    return (
        <>
            <div className="top-bar">
                <div className='left'>
                    <MenuIcon onClick={toggleMenu} />
                    <HomeIcon />
                </div>
                <div className='right'>
                    {/* <AddIcon onClick="" className="btn"/> */}
                    <StarIcon onClick="" className="btn" />
                    <ProfileIcon onClick="" className="btn"/>
                </div>
            </div>
            <div className="search-results">
                <div className={`filter ${isOpen ? "active" : ""}`}>
                    <div className="logo-header">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Αναζήτηση Ακινήτων</h1>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <label>Περιοχή/Πόλη/Νομός</label>
                    <input type="text" placeholder="Αναζήτηση περιοχής" />
        
                    
                    <label>Ενοίκιο ή Αγορά</label>
                    <br></br>

                    <select>
                        <option value="rent">Ενοίκιο</option>
                        <option value="sell">Αγορά</option>
                    </select>
                    
                    <label>Δωμάτια</label>
                    <br></br>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                    </select>

                    <label>Έτος Κατασκευής</label>
                    <br></br>
                    <select>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    <label>Όροφος</label>
                    <br></br>
                    <select>
                        {floors.map((floor) => (
                            <option key={floor} value={floor}>{formatFloorLabel(floor)}</option>
                        ))}
                    </select>

                    <label>Εμβαδόν (τ.μ.)</label>
                    <div className="sqm-range">
                        <select value={sqmMin} onChange={(e) => onMinChange(e.target.value)}>
                            <option value="">Από</option>
                            {sqmOptions.map((n) => (
                                <option key={n} value={n}>{n === 200000 ? '200000+' : n}</option>
                            ))}
                        </select>
                        <span style={{ margin: '0 8px', color: 'white'}}>—</span>
                        <select value={sqmMax} onChange={(e) => setSqmMax(e.target.value)}>
                            <option value="">Έως</option>
                            {filteredMaxOptions.map((n) => (
                                <option key={n} value={n}>{n === 200000 ? '200000+' : n}</option>
                            ))}
                        </select>
                    </div>
                    <label>Τιμή (€)</label>
                    <div className="sqm-range">
                        <select value={priceMin} onChange={(e) => onPriceMinChange(e.target.value)}>
                            <option value="">Από</option>
                            {priceOptions.map((n) => (
                                <option key={n} value={n}>{n === 100000000 ? '100,000,000+' : n.toLocaleString()}</option>
                            ))}
                        </select>
                        <span style={{ margin: '0 8px', color: 'white' }}>—</span>
                        <select value={priceMax} onChange={(e) => setPriceMax(e.target.value)}>
                            <option value="">Έως</option>
                            {filteredPriceMaxOptions.map((n) => (
                                <option key={n} value={n}>{n === 100000000 ? '100,000,000+' : n.toLocaleString()}</option>
                            ))}
                        </select>
                    </div>

                    <label>Με χώρο πάρκινγκ</label>
                    <br></br>
                    <input type="checkbox" id="parking" />
                    <label htmlFor="parking">Ναι</label>
                    <br></br>
                    <br></br>
                    <button className="search-button">Αναζήτηση</button>
                </div>
                <div className="results">
                    <div className="results-list">
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                    </div>
                </div>
            </div>
        </>
    );
}