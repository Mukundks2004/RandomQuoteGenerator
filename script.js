document.getElementById('new-quote').addEventListener('click', fetchQuote);

async function fetchQuote() {
    try {
        const response = await fetch('https://quotes-api-self.vercel.app/quote');
        const data = await response.json();
        document.getElementById('quote').innerText = data.quote;
        document.getElementById('author').innerText = "- " + data.author;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').innerText = 'Could not fetch a new quote. Please try again later.';
    }
}
