import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SearchResolution.css";

export default function SearchResolution() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                setLoggedInUser(JSON.parse(storedUser));
            } catch (error) {
                setLoggedInUser(null);
            }
        }
    }, []);

    useEffect(() => {
        if (!loggedInUser) {
            setFavorites([]);
            return;
        }

        const storedFavorites = localStorage.getItem(`favorites_${loggedInUser.email}`);
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }, [loggedInUser]);

    const handleRemoveFavorite = (favorite) => {
        if (!loggedInUser) {
            navigate('/login');
            return;
        }

        const nextFavorites = favorites.filter((item) => item.id !== favorite.id);
        localStorage.setItem(`favorites_${loggedInUser.email}`, JSON.stringify(nextFavorites));
        setFavorites(nextFavorites);
    };

    const handleItemClick = (item) => {
        navigate(`/property/${item.id}`, { state: { property: item } });
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        navigate('/login');
    };

    return (
        <div className="search-resolution-page">
            <div className="resolution-content">
                <div className="resolution-header">
                    <h1>Αγαπημένα Ακίνητα</h1>
                    {loggedInUser && <p>Συνδεδεμένος ως {loggedInUser.email}</p>}
                </div>

                {!loggedInUser ? (
                    <div className="login-prompt">
                        <p>Για να προσθέσεις αγαπημένα πρέπει να έχεις λογαριασμό και να συνδεθείς.</p>
                        <button type="button" onClick={handleLoginRedirect}>Σύνδεση</button>
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="empty-state">
                        <h2>Δεν υπάρχουν αγαπημένα ακίνητα.</h2>
                        <p>Πήγαινε πίσω στις αναζητήσεις και πρόσθεσε ακίνητα στα αγαπημένα σου.</p>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map((item, index) => (
                            <div key={item.id || index} className="favorite-card" onClick={() => handleItemClick(item)}>
                                <div className="favorite-card-body">
                                    <h3>{item.title || `${item.city || ''} ${item.address || ''}`}</h3>
                                    <p><strong>Τιμή:</strong> {item.price?.toLocaleString('el-GR') || '-'}€</p>
                                    <p><strong>Περιοχή:</strong> {item.city || item.address || '-'}</p>
                                    <p><strong>Έτος:</strong> {item.year || '-'}</p>
                                    <p><strong>Όροφος:</strong> {item.floor || '-'}</p>
                                </div>
                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFavorite(item);
                                    }}
                                >
                                    Αφαίρεση
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
