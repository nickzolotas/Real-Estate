import { useState } from "react"; 
// 1. ⚠️ Προσθήκη του useNavigate από το react-router-dom
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./styles/Home.css";
import logo from "../assets/logoW.png";

export default function Home() {
    const [location, setLocation] = useState('');
    const [filterType, setFilterType] = useState('rent');
    const [category, setCategory] = useState('home');
    
    // 2. Αρχικοποίηση του navigate
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        const searchData = { location, filterType, category };
        navigate('/search', { state: { searchFilters: searchData } });
    };

    return (
        <div className="HomePage">
            <div className="StartBar">
                <img src={logo} alt="Logo" className="logo" />
                <div className="title">
                    <h3>ΚΑΛΩΣ ΗΡΘΑΤΕ ΣΤΗΝ</h3>
                    <h1>ΑΛΕΠΟΤΡΥΠΑ</h1>
                </div> 
                <form onSubmit={handleSearch} className="search-container">
                    <div className="search">
                        <input 
                            type="text" 
                            name="location" 
                            placeholder="Αναζήτηση περιοχής"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} 
                        />
                        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                        </button>
                    </div>
                    
                    <div className="filter">
                        <select 
                            name="filterType" 
                            id="filterType"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="rent">Ενοίκιο</option>
                            <option value="sell">Αγορά</option>
                        </select>

                        <select 
                            name="category" 
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="home">Σπίτι</option>
                            <option value="business">Επιχείρηση</option>
                            <option value="garage">Garage/Parking</option>
                        </select>
                    </div>
                </form>
            </div>

            {/* 3. Καθαρισμός του listings.map αφού τα αποτελέσματα πάνε στη σελίδα SearchResults */}
            <div className="Home">
                <div className="op">Προτεινόμενη Αγγελία 1</div>
                <div className="op">Προτεινόμενη Αγγελία 2</div>
                <div className="op">Προτεινόμενη Αγγελία 3</div>
            </div>
        </div>
    );
}