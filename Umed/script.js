// Add your custom life quotes here
const quotes = [
    "ڕەنگە خودا ئەقڵی بە هەموو کەسێک بەخشیبێت \n بەڵام ئەقڵ خودای بە هەموو کەسێک نەبەخشیبێت",
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

// Remove or replace the canplaythrough listener:
document.addEventListener('DOMContentLoaded', () => {
  // Display the dialog modal immediately when the page structure is ready
  if (dialo) {
    dialo.style.display = 'flex'; // Use flex to match your dialog flex layout
  }
});

// Audio preloading optional fix for iOS:
clickSound.load();


starto.addEventListener('click', function() {
    // Hide overlay modal immediately
    morphin.style.display = 'none'; // Completely remove from layout instead of 'hidden'
    
    // Play audio safely
    try {
        clickSound.currentTime = 80;
        clickSound.volume = 0;
        let playPromise = clickSound.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Fade-in logic
                const intervalTime = 100;
                let volumeStep = 0.02;
                const fadeInterval = setInterval(() => {
                    if (clickSound.volume < 1.0) {
                        clickSound.volume = pot * Math.min(clickSound.volume + volumeStep, 1);
                    } else {
                        clearInterval(fadeInterval);
                    }
                }, intervalTime);
            }).catch(error => {
                console.log("Audio playback blocked or failed:", error);
            });
        }
    } catch (e) {
        console.error("Audio error:", e);
    }
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

// Triggers when the page is being hidden or unloaded
window.addEventListener('pagehide', () => {
  clickSound.pause();
  clickSound.currentTime = 0;
});

// Alternative: Pauses audio if the user switches to another tab or minimizes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clickSound.pause();
  } else {
    // User came back to the tab
    myAudio.play().catch(error => {
      // Handles browser autoplay restrictions if needed
      console.log("Autoplay prevented on return:", error);
    });
  }
});



