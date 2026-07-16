// Add your custom life quotes here
const quotes = [
    "ڕەنگە خودا ئەقڵی بە هەموو کەسێک بەخشیبێت، بەڵام ئەقڵ خودای بە هەموو کەسێک نەبەخشیبێت",
    "بەڕاستی ژیان نادادپەروەرە \n بەڵام بەڕاستی خودا دادپەروەرە",
    "ئێرە ژیانی دونیایە نەک بەهەشت، بەڵام مەرج ئەوەیە هەموو کات ئەمەت لەبیربێت",
    "ناتوانیت لە دوو کەس تێبگەیت \n کەسێک کە بیرناکاتەوە و دەردەبڕێت \n کەسێک کە بیردەکاتەوە و دەرنابڕێت"
];

const soundSwitch = document.getElementById('sondy');
const muteButton = document.getElementById('un-mute');
let pot = 1;

soundSwitch.addEventListener('click', () => {
  // Check if the icon is currently 'fa-volume-up'
  if (soundSwitch.classList.contains('fa-volume-up')) {
    // Remove 'fa-volume-up' and add 'fa-volume-mute'
    soundSwitch.classList.remove('fa-volume-up');
    soundSwitch.classList.add('fa-volume-mute');
    clickSound.volume = 0;
      pot = 0;
    console.log(pot);
  } else {
    // Otherwise, reverse the change
    soundSwitch.classList.remove('fa-volume-mute');
    soundSwitch.classList.add('fa-volume-up');
    clickSound.volume = 1;
      pot = 1;
    console.log(pot);
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
    clickSound.currentTime = 80;
    clickSound.volume = 0;
    clickSound.play();
    // Gradually increase the volume
    const fadeDuration = 10000; // Total fade-in time in milliseconds (3 seconds)
    const intervalTime = 100;  // How often to increase volume (every 0.1 seconds)
    let volumeStep = 0.01; // How much to increase each step (~0.033)
    volumeStep = volumeStep + 0.01;
    const fadeInterval = setInterval(() => {
      if (clickSound.volume < 1.0) {
        // Prevent volume exceeding the maximum limit of 1.0
        clickSound.volume = pot * Math.min(clickSound.volume + volumeStep, 1);
      } else {
        // Stop the timer once we reach full volume
        clearInterval(fadeInterval);
      }
    }, intervalTime);
});

// Select the copy button by its ID
const copyButton = document.getElementById('copy');

// The manual text you want to copy to the clipboard
const textToCopy = "https://graphic-st2dy.github.io/Profile/Umed/";

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
    const currentQuote = quotes[currentQuoteIndex];
    quoteElement.innerText = quotes[currentQuoteIndex];
    quoteElement.style.opacity = 1; 

    const readingTime = Math.max(3000, currentQuote.length * 80);
  
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

    }, 2000 + readingTime); 
}

// Initialize the cycle when the page loads
window.onload = cycleQuotes;


