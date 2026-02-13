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

// Function to create floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";

  // Randomize appearance
  const startX = Math.random() * 100; // 0 to 100vw
  const duration = Math.random() * 3 + 4; // 4 to 7 seconds
  const scale = Math.random() * 1.5 + 0.8; // 0.8 to 2.3
  const drift = (Math.random() - 0.5) * 200; // -100 to 100px horizontal drift

  heart.style.left = startX + "vw";
  heart.style.setProperty("--duration", duration + "s");
  heart.style.setProperty("--scale", scale);
  heart.style.setProperty("--drift", drift + "px");
  heart.style.fontSize = Math.random() * 20 + 15 + "px";

  heartsContainer.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Click Envelope
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// Logic to move the NO button and grow the YES button
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

  // Shrink the No button slightly and Grow the Yes button
  noClickCount++;
  const noScale = Math.max(0.4, 1 - noClickCount * 0.08);
  noBtn.style.transform = `scale(${noScale})`;

  yesScale += 0.2;
  yesBtn.style.transform = `scale(${yesScale})`;
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

// YES is clicked
yesBtn.addEventListener("click", () => {
  title.textContent = "Yippeeee! I love you! ❤️";
  catImg.src = "Public/assets/cat_dance.gif";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";

  // Start continuous heart rain
  setInterval(createHeart, 200);

  // Initial burst of hearts
  for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 100);
  }
});
