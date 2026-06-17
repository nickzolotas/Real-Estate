import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./styles/Home.css";
import logo from "../assets/logoW.png";

export default function Home() {
    return (
        <div className="HomePage">
            <div className="StartBar">
                <img src={logo} alt="Logo" className="logo" />
                <div className="title">
                    <h3>ΚΑΛΩΣ ΗΡΘΑΤΕ ΣΤΗΝ</h3>
                    <h1>ΑΛΕΠΟΤΡΥΠΑ</h1>
                </div> 
                <div className="search-container">
                    <div className="search">
                        <input type="text" placeholder="Αναζήτηση περιοχής" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    </div>
                    <div className="filter">
                        <select name="filterType" id="filterType">
                            <option value="rent">Ενοίκιο</option>
                            <option value="sell">Αγορά</option>
                        </select>
                        <select name="category" id="category">
                            <option value="home">Σπίτι</option>
                            <option value="business">Επιχείρηση</option>
                            <option value="garage">Garage/Parking</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="Home">
                <div className="op">1</div>
                <div className="op">2</div>
                <div className="op">3</div>
            </div>
        </div>
    );
}