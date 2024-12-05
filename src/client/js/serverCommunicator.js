// Import validation function
import { isValidLink } from './inputValidator';

const backendEndpoint = 'http://localhost:8000/processData';

// Add event listener to the form
document.getElementById('urlForm').addEventListener('submit', handleFormSubmit);

// Handles the form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const inputUrl = document.getElementById('name').value;

    if (isValidLink(inputUrl)) {
        sendUrlToServer(inputUrl);
    } else {
        alert("The URL you entered is not valid. Please try again.");
    }
}

// Send the user-entered URL to the server for analysis
async function sendUrlToServer(url) {
    try {
        const response = await fetch(backendEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        const responseData = await response.json();

        if (response.ok) {
            displayResults(responseData);
        } else {
            console.error("Error from server:", responseData);
            alert("Failed to analyze the URL. Please try later.");
        }
    } catch (err) {
        console.error("Request failed:", err);
        alert("A network error occurred. Please try again.");
    }
}

// Update the DOM with the analysis results
function displayResults(data) {
    const resultSection = document.getElementById('results');
    resultSection.innerHTML = `
        <h3>Analysis Results</h3>
        <p><strong>Sentiment:</strong> ${data.polarity}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
        <p><strong>Title:</strong> ${data.text}</p>
    `;
}

// Export the main function for testing
export { handleFormSubmit };
