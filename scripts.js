// Tab functionality: Make tabs clickable and navigate to their respective pages
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const href = tab.querySelector('img').getAttribute('href');
        if (href) {
            window.location.href = href;
        }
    });
});

// Quote animation: Swipe quotes in from the side
const quotes = [
    '"Big changes start with bold hearts."',
    '"Empowering the future of medicine."',
    '"Your journey starts here."'
];
let currentQuote = 0;

function updateQuote() {
    const quoteElement = document.getElementById('quote');
    quoteElement.style.opacity = 0; // Hide the current quote
    quoteElement.style.transform = 'translateX(-100%)'; // Move it out of view

    setTimeout(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        quoteElement.textContent = quotes[currentQuote];
        quoteElement.style.transform = 'translateX(0)'; // Bring the new quote into view
        quoteElement.style.opacity = 1; // Show the new quote
    }, 500); // Delay for the swipe effect
}

setInterval(updateQuote, 5000);
