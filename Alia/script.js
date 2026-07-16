// Add your custom life quotes here
const quotes = [
    "ئەگەر گوڵ نیت، دڕکیش مەبە",
    "ژیان نادادپەروەرە، بەڵام خودا دادپەروەرە",
    "Your time is limited, so don't waste it living someone else's life.",
    "Do what you can, with what you have, where you are."
];

const muteButton = document.getElementById('un-mute');

muteButton.addEventListener('click', function() {
    // Make the button invisible, but keep its blank space
    muteButton.style.visibility = 'hidden';
});

// Select the copy button by its ID
const copyButton = document.getElementById('copy');

// The manual text you want to copy to the clipboard
const textToCopy = "This is the manual text you want to copy!";

// Add the click event listener
copyButton.addEventListener('click', function() {
    // Copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Once the copy is successful, make the button gone
            copyButton.style.display = 'none'; 
            
            // Note: If you want to keep the blank space, use this instead:
            // copyButton.style.visibility = 'hidden';
        })
        .catch(err => {
            // A fallback error check in case the browser blocks clipboard access
            console.error('Could not copy text: ', err);
        });
});


let currentQuoteIndex = 0;
const quoteElement = document.getElementById("quote-text");

function cycleQuotes() {
    // 1. Insert the text and trigger the 2-second fade-in
    quoteElement.innerText = quotes[currentQuoteIndex];
    quoteElement.style.opacity = 1; 

    // 2. Wait for fade-in (2s) + reading time (5s) = 7000ms
    setTimeout(() => {
        // Trigger the 2-second fade-out
        quoteElement.style.opacity = 0; 

        // 3. Wait for fade-out (2s) + empty time (2s) = 4000ms
        setTimeout(() => {
            // Move to the next quote in the list
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            
            // Loop the cycle
            cycleQuotes();
        }, 4000); 

    }, 7000); 
}

// Initialize the cycle when the page loads
window.onload = cycleQuotes;


