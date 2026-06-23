import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ⚠️ Χρειάζεται για να πάρουμε τα δεδομένα από την προηγούμενη σελίδα
import "./styles/SearchResults.css";

import Item from "./components/Item.jsx";
import MenuIcon from './components/MenuIcon.jsx';
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
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [favoriteIds, setFavoriteIds] = useState([]);

    // --- 2. States για όλα τα φίλτρα του Sidebar ---
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [filterType, setFilterType] = useState('rent');
    const [category, setCategory] = useState('home');
    const [rooms, setRooms] = useState('');
    const [year, setYear] = useState('');
    const [floor, setFloor] = useState('');
    const [sqmMin, setSqmMin] = useState('');
    const [sqmMax, setSqmMax] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [hasParking, setHasParking] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchListings = async (filters) => {
        if (!filters.filterType || !filters.category) {
            setErrorMessage('Ο τύπος της αγοράς και η ιδιότητα είναι υποχρεωτικά φίλτρα.');
            setListings([]);
            return;
        }

        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/node/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters),
            });

            const data = await response.json();
            if (Array.isArray(data)) {
                setListings(data);
            } else {
                setListings([]);
            }
        } catch (error) {
            console.error("Σφάλμα Sidebar αναζήτησης:", error);
            setErrorMessage('Υπήρξε σφάλμα κατά τη λήψη των αποτελεσμάτων.');
            setListings([]);
        }
    };

    const getFavoriteStorageKey = (user) => `favorites_${user?.email || 'guest'}`;
    const loadFavorites = (user) => {
        if (!user) return [];
        const stored = localStorage.getItem(getFavoriteStorageKey(user));
        return stored ? JSON.parse(stored) : [];
    };

    const saveFavorites = (user, items) => {
        if (!user) return;
        localStorage.setItem(getFavoriteStorageKey(user), JSON.stringify(items));
    };

    const handleFavorite = (item) => {
        if (!loggedInUser) {
            navigate('/login');
            return;
        }

        const currentFavorites = loadFavorites(loggedInUser);
        if (currentFavorites.some((favorite) => favorite.id === item.id)) {
            return;
        }

        const updated = [...currentFavorites, item];
        saveFavorites(loggedInUser, updated);
        setFavoriteIds(updated.map((favorite) => favorite.id));
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setLoggedInUser(parsedUser);
    }, []);

    useEffect(() => {
        if (!loggedInUser) {
            setFavoriteIds([]);
            return;
        }

        const favorites = loadFavorites(loggedInUser);
        setFavoriteIds(favorites.map((favorite) => favorite.id));
    }, [loggedInUser]);

    useEffect(() => {
        if (routerLocation.state && routerLocation.state.searchFilters) {
            const filters = routerLocation.state.searchFilters;
            setLocation(filters.location || '');
            setFilterType(filters.filterType || 'rent');
            setCategory(filters.category || 'home');
            setRooms(filters.rooms || '');
            setYear(filters.year || '');
            setFloor(filters.floor || '');
            setSqmMin(filters.sqmMin || '');
            setSqmMax(filters.sqmMax || '');
            setPriceMin(filters.priceMin || '');
            setPriceMax(filters.priceMax || '');
            setHasParking(filters.hasParking || false);

            fetchListings({
                location: filters.location || '',
                filterType: filters.filterType || 'rent',
                category: filters.category || 'home',
                rooms: filters.rooms || '',
                year: filters.year || '',
                floor: filters.floor || '',
                sqmMin: filters.sqmMin || '',
                sqmMax: filters.sqmMax || '',
                priceMin: filters.priceMin || '',
                priceMax: filters.priceMax || '',
                hasParking: filters.hasParking || false
            });
        }
    }, [routerLocation.state]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const handleItemClick = (item) => {
        const currentSearchFilters = {
            location,
            filterType,
            category,
            rooms,
            year,
            floor,
            sqmMin,
            sqmMax,
            priceMin,
            priceMax,
            hasParking
        };

        navigate(`/property/${item.id}`, {
            state: {
                property: item,
                searchFilters: currentSearchFilters
            }
        });
    };

    // --- 4. Η συνάρτηση αναζήτησης από το Sidebar ---
    const handleSidebarSearch = () => {
        const searchFilters = {
            location,
            filterType,
            category,
            rooms,
            year,
            floor,
            sqmMin,
            sqmMax,
            priceMin,
            priceMax,
            hasParking
        };

        fetchListings(searchFilters);
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

                    <label>Ιδιότητα Ακινήτου</label>
                    <br></br>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="home">Σπίτι</option>
                        <option value="business">Επιχείρηση</option>
                        <option value="garage">Garage/Parking</option>
                    </select>
                    
                    <label>Δωμάτια</label>
                    <br></br>
                    <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
                        <option value="">Όλα</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                    </select>

                    <label>Έτος Κατασκευής</label>
                    <br></br>
                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="">Όλα</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>

                    <label>Όροφος</label>
                    <br></br>
                    <select value={floor} onChange={(e) => setFloor(e.target.value)}>
                        <option value="">Όλοι</option>
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
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    <button type="button" className="search-button" onClick={handleSidebarSearch}>Αναζήτηση</button>
                </div>
                <div className="results">
                    <div className="results-list">
                        {/* 5. Δυναμικό Map: Αν υπάρχουν αγγελίες στη βάση, τις δείχνει, αλλιώς γράφει ένα μήνυμα */}
                        {listings.length > 0 ? (
                            listings.map((item, index) => (
                                <Item
                                    key={item.id || index}
                                    data={item}
                                    onClick={() => handleItemClick(item)}
                                    onFavorite={() => handleFavorite(item)}
                                    isFavorite={favoriteIds.includes(item.id)}
                                />
                            ))
                        ) : (
                            <h5 style={{ color: 'black', textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>
                                Δεν βρέθηκαν ακίνητα. Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης.
                            </h5>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}