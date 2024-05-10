import express from 'express';
import cors from 'cors'; // Use ES module import instead of require
import { generateImage } from './components/generate-image.js';

const app = express(); // Define 'app' before using it

app.use(cors()); // Use CORS middleware correctly after app is defined
app.use(express.json()); // Parse JSON payloads

const PORT = 4000;

app.post('/generate-image', async (req, res) => {
    try {
        const prompt = req.body.prompt; // Extract the prompt from request body
        const imageResponse = await generateImage(prompt); // Generate image based on the prompt
        res.json(imageResponse);
    } catch (error) {
        res.status(500).send(error.message); // Send error message on failure
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
