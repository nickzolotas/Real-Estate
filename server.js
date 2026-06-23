import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.post('/api/node/CheckLogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const javaResponse = await fetch('http://localhost:8081/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await javaResponse.json();

        if (!javaResponse.ok) {
            return res.status(javaResponse.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Σφάλμα κατά τη σύνδεση" });
    }
});

app.post('/api/node/register', async (req, res) => {
    try {
        const userData = req.body;

        const javaResponse = await fetch('http://localhost:8081/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await javaResponse.json();

        if (!javaResponse.ok) {
            return res.status(javaResponse.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Σφάλμα server κατά την εγγραφή" });
    }
});

app.post('/api/node/search', async (req, res) => {
    try {
        const searchFilters = req.body; 
        console.log("Λήφθηκαν φίλτρα από React:", searchFilters);

        const javaResponse = await fetch('http://localhost:8081/api/listings/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchFilters)
        });

        const listings = await javaResponse.json();

        res.json(listings);

    } catch (error) {
        console.error("Σφάλμα κατά την επικοινωνία με την Java:", error);
        res.status(500).json({ error: "Internal Server Error στην επικοινωνία με το backend" });
    }
});

app.post('/api/node/new-listing', async (req, res) => {
    try {
        const listingData = req.body;

        const javaResponse = await fetch('http://localhost:8081/api/listings/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listingData)
        });

        const data = await javaResponse.json();
        res.status(javaResponse.status).json(data);
    } catch (error) {
        console.error("Σφάλμα κατά την αποστολή νέας αγγελίας:", error);
        res.status(500).json({ error: "Internal Server Error κατά την αποστολή της νέας αγγελίας" });
    }
});










app.get('/api/test', async (req, res) => {
    res.json({ message: "Success" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
