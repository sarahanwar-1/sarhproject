const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
const app = express();
const PORT = 8000;

// Load environment variables
dotenv.config();

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('dist')); // Serve static files from dist

// API Configuration
const API_KEY = process.env.API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Endpoint to handle data from the client
app.post('/processData', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const newsResponse = await fetch(`${NEWS_API_URL}?q=${encodeURIComponent(url)}&apiKey=${API_KEY}`);
        const newsData = await newsResponse.json();

        if (!newsData.articles || newsData.articles.length === 0) {
            return res.status(404).json({ error: "No articles found for the provided URL" });
        }

        const topArticle = newsData.articles[0];

        // Assuming you would analyze the article's sentiment or subjectivity
        res.json({
            polarity: "positive", // You can replace this with actual sentiment analysis
            subjectivity: "subjective", // Similarly, update subjectivity logic
            text: topArticle.title,
        });
    } catch (error) {
        console.error("Error connecting to NewsAPI:", error);
        res.status(500).json({ error: "Server error occurred" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
