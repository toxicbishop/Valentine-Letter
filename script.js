// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const heartsContainer = document.getElementById("hearts-container");

let noClickCount = 0;
let yesScale = 1;

// --- Floating Hearts Background ---
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";

  // Randomize appearance
  const startX = Math.random() * 100; // 0 to 100vw
  const duration = Math.random() * 3 + 4; // 4 to 7 seconds
  const scale = Math.random() * 1.5 + 1.0; // 1.0 to 2.5 (Way Bigger!)
  const drift = (Math.random() - 0.5) * 200; // -100 to 100px horizontal drift

  heart.style.left = startX + "vw";
  heart.style.setProperty("--duration", duration + "s");
  heart.style.setProperty("--scale", scale);
  heart.style.setProperty("--drift", drift + "px");
  heart.style.fontSize = Math.random() * 30 + 25 + "px"; // Much bigger base font

  heartsContainer.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Generate hearts more frequently
setInterval(createHeart, 150);

// --- Interactions ---

// Click Envelope
envelope.addEventListener("click", () => {
  envelope.style.opacity = "0";
  setTimeout(() => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => {
      document.querySelector(".letter-window").classList.add("open");
    }, 50);
  }, 300);
});

// Logic to move and shrink the NO button
function moveNoButton() {
  const rect = noBtn.getBoundingClientRect();
  const btnWidth = rect.width;
  const btnHeight = rect.height;

  // Boundary check - Keep it within viewport with padding
  const padding = 50;
  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const randomX = Math.max(padding, Math.random() * maxX);
  const randomY = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
  noBtn.style.zIndex = "999";

  // Shrink the No button and Grow the Yes button
  noClickCount++;
  const noScale = Math.max(0.3, 1 - noClickCount * 0.1);
  noBtn.style.transform = `scale(${noScale})`;

  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Change text after some tries
  if (noClickCount === 3) noBtn.textContent = "Are you sure?";
  if (noClickCount === 5) noBtn.textContent = "Think again!";
  if (noClickCount === 8) noBtn.textContent = "Please? 🥺";
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

// YES is clicked
yesBtn.addEventListener("click", () => {
  title.textContent = "Yippeeee! I love you! ❤️";
  catImg.src = "Public/assets/cat_dance.gif";

  // Final UI cleanup
  buttons.style.display = "none";
  finalText.style.display = "block";

  // Extra celebration: Rain of hearts
  for (let i = 0; i < 30; i++) {
    setTimeout(createHeart, i * 100);
  }
});
