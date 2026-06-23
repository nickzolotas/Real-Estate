import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/NewListing.css";
import Input from "./components/Input.jsx";

import logo from "../assets/logoW.png";

export default function NewListing(){
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [floor, setFloor] = useState('');
    const [year, setYear] = useState('');
    const [filterType, setFilterType] = useState('rent');
    const [category, setCategory] = useState('home');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                setLoggedInUser(JSON.parse(storedUser));
            } catch (err) {
                setLoggedInUser(null);
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!loggedInUser) {
            setError('Πρέπει να συνδεθείς ως Seller για να ανεβάσεις αγγελία.');
            navigate('/login');
            return;
        }

        if (loggedInUser.role !== 'S') {
            setError('Μόνο οι Seller χρήστες μπορούν να ανεβάσουν αγγελία.');
            return;
        }

        if (!title || !price || !size || !address || !city) {
            setError('Συμπλήρωσε όλα τα υποχρεωτικά πεδία.');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            title,
            description,
            size,
            price,
            address,
            city,
            floor,
            year,
            filterType,
            category,
            status: 'available'
        };

        try {
            const response = await fetch('http://localhost:5000/api/node/new-listing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Σφάλμα κατά την αποστολή της αγγελίας.');
            }

            setSuccess('Η αγγελία καταχωρήθηκε με επιτυχία!');
            setTitle('');
            setDescription('');
            setSize('');
            setPrice('');
            setAddress('');
            setCity('');
            setFloor('');
            setYear('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!loggedInUser) {
        return (
            <div className="newListing-background">
                <div className="newListing-container">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="newListing-form">
                        <h2>Πρέπει να συνδεθείς</h2>
                        <p>Σύνδεση απαιτείται για να ανεβάσεις αγγελία.</p>
                        <button className="submit" onClick={() => navigate('/login')}>
                            Σύνδεση
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loggedInUser.role !== 'S') {
        return (
            <div className="newListing-background">
                <div className="newListing-container">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="newListing-form">
                        <h2>Δεν έχεις δικαίωμα</h2>
                        <p>Μόνο οι Seller χρήστες μπορούν να καταχωρήσουν νέα αγγελία.</p>
                        <button className="submit" onClick={() => navigate('/')}>Επιστροφή</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="newListing-background">
            <div className="newListing-container">
                <div className="back" onClick={() => navigate('/')}>🡸</div>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <form className="newListing-form" onSubmit={handleSubmit}>
                    <h2>Νέα Αγγελία</h2>
                    <br />
                    <Input labelText="Τίτλος Αγγελίας" className="inp" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br />

                    <Input labelText="Περιγραφή" isTextArea={true} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br />

                    <Input labelText="Τετραγωνικά Μέτρα" className="inp" value={size} onChange={(e) => setSize(e.target.value)} />
                    <br />

                    <Input labelText="Τιμή" className="inp" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <br />

                    <Input labelText="Διεύθυνση" className="inp" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <br />

                    <Input labelText="Πόλη" className="inp" value={city} onChange={(e) => setCity(e.target.value)} />
                    <br />

                    <Input labelText="Όροφος" className="inp" value={floor} onChange={(e) => setFloor(e.target.value)} />
                    <br />

                    <Input labelText="Έτος Κατασκευής" className="inp" value={year} onChange={(e) => setYear(e.target.value)} />
                    <br />

                    <label>Ενοίκιο ή Αγορά</label>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="rent">Ενοίκιο</option>
                        <option value="sell">Αγορά</option>
                    </select>
                    <br />

                    <label>Ιδιότητα Ακινήτου</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="home">Σπίτι</option>
                        <option value="business">Επιχείρηση</option>
                        <option value="garage">Garage/Parking</option>
                    </select>
                    <br />

                    <input type="file" multiple disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                    <br />

                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

                    <div className="submitbtn">
                        <button type="submit" className="submit" disabled={isSubmitting}>
                            <b>{isSubmitting ? 'Αποστολή...' : 'Καταχώρηση Αγγελίας'}</b>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
