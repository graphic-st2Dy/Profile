// Add your custom life quotes here
const quotes = [
    "Judge me when you are perfect.",
    "Once is a mistake \n Twice is a choice.",
    "close the window that hurts you, \n no matter how beautiful the view is",
    "Sometimes you win. \n Sometimes you learn."
];

const soundSwitch = document.getElementById('sondy');
const muteButton = document.getElementById('un-mute');


soundSwitch.addEventListener('click', () => {
  // Check if the icon is currently 'fa-volume-up'
  if (soundSwitch.classList.contains('fa-volume-up')) {
    // Remove 'fa-volume-up' and add 'fa-volume-mute'
    soundSwitch.classList.remove('fa-volume-up');
    soundSwitch.classList.add('fa-volume-mute');
      clickSound.volume = 0;
  } else {
    // Otherwise, reverse the change
    soundSwitch.classList.remove('fa-volume-mute');
    soundSwitch.classList.add('fa-volume-up');
      clickSound.volume = 1;
  }
});

const clickSound = new Audio('music.mp3');

const starto = document.getElementById('start');
const morphin = document.getElementById('morph');
const dialo = document.getElementById('dialo');

clickSound.addEventListener('canplaythrough', () => {
  // The audio is loaded! Make the dialog visible.
  dialo.style.display = 'block';
  }, { once: true });

starto.addEventListener('click', function() {
    // Make the button invisible, but keep its blank space
    morphin.style.visibility = 'hidden';
    clickSound.play();
});

// Select the copy button by its ID
const copyButton = document.getElementById('copy');

// The manual text you want to copy to the clipboard
const textToCopy = "https://graphic-st2dy.github.io/Profile/Alia/";

// Add the click event listener
copyButton.addEventListener('click', function() {
    // Copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Once the copy is successful, make the button gone
            copyButton.style.color = '#22ff22'; 
            copyButton.style.borderColor = '#22ff22'
            
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


