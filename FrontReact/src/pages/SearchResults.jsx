import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // ⚠️ Χρειάζεται για να πάρουμε τα δεδομένα από την προηγούμενη σελίδα
import "./styles/SearchResults.css";

import Item from "./components/Item.jsx";
import MenuIcon from './components/MenuIcon.jsx';
import HomeIcon from './components/HomeIcon.jsx';
import ProfileIcon from './components/ProfileIcon.jsx';
import StarIcon from './components/StarIcon.jsx';
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
    const routerLocation = useLocation(); // Διαβάζει το state του Router
    const years = getConstructionYears();
    const floors = getFloors();
    
    // --- 1. States για τη διαχείριση των αποτελεσμάτων ---
    const [listings, setListings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // --- 2. States για όλα τα φίλτρα του Sidebar ---
    const [location, setLocation] = useState('');
    const [filterType, setFilterType] = useState('rent');
    const [rooms, setRooms] = useState('1');
    const [year, setYear] = useState('2024');
    const [floor, setFloor] = useState('0');
    const [sqmMin, setSqmMin] = useState('');
    const [sqmMax, setSqmMax] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [hasParking, setHasParking] = useState(false);

    // 3. Μόλις φορτώσει η σελίδα, έλεγξε αν ήρθαν ήδη δεδομένα από την αρχική σελίδα Home
    useEffect(() => {
        if (routerLocation.state && routerLocation.state.results) {
            setListings(routerLocation.state.results);
        }
    }, [routerLocation.state]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    // --- 4. Η συνάρτηση αναζήτησης από το Sidebar ---
    const handleSidebarSearch = async () => {
        const searchFilters = {
            location,
            filterType,
            rooms,
            year,
            floor,
            sqmMin,
            sqmMax,
            priceMin,
            priceMax,
            hasParking
        };

        try {
            const response = await fetch('http://localhost:5000/api/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchFilters),
            });

            const data = await response.json();
            if (Array.isArray(data)) {
                setListings(data); // Αποθήκευση των νέων αποτελεσμάτων
            }
        } catch (error) {
            console.error("Σφάλμα Sidebar αναζήτησης:", error);
        }
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
                    <StarIcon onClick={() => {}} className="btn" />
                    <ProfileIcon onClick={() => {}} className="btn"/>
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
                    <input 
                        type="text" 
                        placeholder="Αναζήτηση περιοχής" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
        
                    <label>Ενοίκιο ή Αγορά</label>
                    <br></br>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="rent">Ενοίκιο</option>
                        <option value="sell">Αγορά</option>
                    </select>
                    
                    <label>Δωμάτια</label>
                    <br></br>
                    <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                    </select>

                    <label>Έτος Κατασκευής</label>
                    <br></br>
                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>

                    <label>Όροφος</label>
                    <br></br>
                    <select value={floor} onChange={(e) => setFloor(e.target.value)}>
                        {floors.map((f) => (
                            <option key={f} value={f}>{formatFloorLabel(f)}</option>
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
                    <input 
                        type="checkbox" 
                        id="parking" 
                        checked={hasParking}
                        onChange={(e) => setHasParking(e.target.checked)}
                    />
                    <label htmlFor="parking">Ναι</label>
                    <br></br>
                    <br></br>
                    {/* Προσθήκη onClick για να εκτελείται η αναζήτηση */}
                    <button type="button" className="search-button" onClick={handleSidebarSearch}>Αναζήτηση</button>
                </div>
                <div className="results">
                    <div className="results-list">
                        {/* 5. Δυναμικό Map: Αν υπάρχουν αγγελίες στη βάση, τις δείχνει, αλλιώς γράφει ένα μήνυμα */}
                        {listings.length > 0 ? (
                            listings.map((item, index) => (
                                <Item key={item.id || index} data={item} />
                            ))
                        ) : (
                            <p style={{ color: 'white', textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>
                                Δεν βρέθηκαν ακίνητα. Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}