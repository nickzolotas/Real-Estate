import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.post('/CheckLogin', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});