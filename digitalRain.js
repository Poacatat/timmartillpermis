// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx    = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = '01'//'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン'.trim();
    letters = letters.split('');

// Setting up the columns
var fontSize = 30,  // Larger font size
     columns = canvas.width / fontSize*3; // Increased column density for heavier rain

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = Math.random() * canvas.height;  // Start each drop at a random position
}

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';  // Slight darkening for the trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';  // Green text
    ctx.font = '30px monospace'
    ctx.fillText(text, (i * fontSize)%(fontSize*columns), drops[i], 100);  // Draw the character

    drops[i] += fontSize;  // Increase the drop's position by the font size

    // Reset the drop if it has gone off screen, with a higher chance to reset for heavier rain
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {  // Increase the probability to make the rain denser
      drops[i] = 0;
    }
   
  }
}

function addMoreDrops() {
    for (var i = 0; i < 10; i++) {  // Add 10 new drops every few milliseconds
      drops.push(Math.random() * canvas.height);  // Random position
    }
  }
//setInterval(addMoreDrops, 5);
// Loop the animation
setInterval(draw,33);
