import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from "./StarIcon.jsx";
import logo from "../../assets/logoW.png";
import "./style/Header.css";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                setLoggedInUser(JSON.parse(storedUser));
            } catch (error) {
                setLoggedInUser(null);
            }
        } else {
            setLoggedInUser(null);
        }
    }, [location.pathname]);

    const handleFavorites = () => {
        if (!loggedInUser) {
            navigate('/login');
            return;
        }
        navigate('/searchResolution');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <img onClick={(navigate => '/')} src={logo} alt="Logo" className="header-logo" />
            </div>
            <div className="header-right">
                <div className="header-actions">
                    {loggedInUser?.role === 'S' && (
                        <button type="button" className="header-button login-button" onClick={() => navigate('/new-listing')}>
                            Νέα Αγγελία
                        </button>
                    )}
                    <StarIcon onClick={handleFavorites} className="btn" />
                    {loggedInUser ? (
                        <>
                            <span className="header-user">{loggedInUser.email}</span>
                            <button type="button" className="header-button logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button type="button" className="header-button login-button" onClick={handleLogin}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
