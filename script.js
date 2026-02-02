// Valentine's Day Interactive Page

// Main elements
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const bgHeartsContainer = document.getElementById("bgHearts");

// Create subtle background hearts
function initBackgroundHearts() {
  const hearts = ["♥", "♡", "❤"];

  // Create initial hearts
  for (let i = 0; i < 15; i++) {
    createBgHeart(hearts, Math.random() * 100);
  }

  // Keep spawning new hearts
  setInterval(() => {
    if (bgHeartsContainer) {
      createBgHeart(hearts, -10);
    }
  }, 2000);
}

function createBgHeart(hearts, startY) {
  const heart = document.createElement("div");
  heart.className = "bg-heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = startY + "vh";
  heart.style.fontSize = 0.8 + Math.random() * 1.2 + "rem";
  heart.style.animationDuration = 15 + Math.random() * 20 + "s";
  heart.style.animationDelay = Math.random() * 5 + "s";
  heart.style.color = `hsl(${340 + Math.random() * 20}, 80%, ${
    70 + Math.random() * 15
  }%)`;
  bgHeartsContainer.appendChild(heart);

  // Remove after animation
  setTimeout(() => heart.remove(), 40000);
}

// Initialize background hearts
initBackgroundHearts();

// Desktop: No button escapes from cursor
const escapeDistance = 120;

// Predefined safe positions using viewport units
const safePositions = [
  { left: "10vw", top: "10vh" },
  { left: "70vw", top: "10vh" },
  { left: "10vw", top: "70vh" },
  { left: "70vw", top: "70vh" },
  { left: "40vw", top: "10vh" },
  { left: "40vw", top: "70vh" },
  { left: "10vw", top: "40vh" },
  { left: "70vw", top: "40vh" },
];

let lastPositionIndex = -1;
let movedToBody = false;

function moveNoButton() {
  // Move button to body on first escape (fixes backdrop-filter breaking fixed positioning)
  if (!movedToBody) {
    document.body.appendChild(noBtn);
    movedToBody = true;
  }

  // Pick a random position different from last one
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * safePositions.length);
  } while (newIndex === lastPositionIndex);
  lastPositionIndex = newIndex;

  const pos = safePositions[newIndex];
  noBtn.style.position = "fixed";
  noBtn.style.left = pos.left;
  noBtn.style.top = pos.top;
  noBtn.style.zIndex = "9999";
}

document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const deltaX = e.clientX - btnCenterX;
  const deltaY = e.clientY - btnCenterY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance < escapeDistance) {
    moveNoButton();
  }
});

// Spawn a Yes button at random position (for mobile)
function spawnYesButton() {
  const btn = document.createElement("button");
  btn.className = "btn btn-yes btn-spawned";
  btn.textContent = "Yes";
  btn.style.position = "fixed";
  btn.style.left = 10 + Math.random() * 60 + "vw";
  btn.style.top = 10 + Math.random() * 60 + "vh";
  btn.style.zIndex = "9998";
  btn.style.animation = "popIn 0.3s ease-out";
  btn.addEventListener("click", showCelebration);
  document.body.appendChild(btn);
}

// Show celebration screen
function showCelebration() {
  // Hide main content and background hearts
  document.querySelector(".container").style.display = "none";
  noBtn.style.display = "none";
  bgHeartsContainer.style.display = "none";

  // Remove any spawned buttons
  document.querySelectorAll(".btn-spawned").forEach((btn) => btn.remove());

  // Create celebration screen
  const celebration = document.createElement("div");
  celebration.className = "celebration";
  celebration.innerHTML = `
        <h1 class="celebration-title">Yay!</h1>
        <p class="celebration-text">You've made me the happiest! I love you, baby!</p>
        <div class="hearts-container" id="heartsContainer"></div>
    `;
  document.body.appendChild(celebration);

  // Spawn hearts
  createHearts();
}

// Create floating hearts animation
function createHearts() {
  const container = document.getElementById("heartsContainer");
  const heartSymbols = ["❤️", "💕", "💖", "💗", "💓", "💝"];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 2 + Math.random() * 3 + "s";
      heart.style.fontSize = 1 + Math.random() * 2 + "rem";
      container.appendChild(heart);

      // Remove heart after animation
      setTimeout(() => heart.remove(), 5000);
    }, i * 100);
  }

  // Keep spawning hearts
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 3 + "s";
    heart.style.fontSize = 1 + Math.random() * 2 + "rem";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 200);
}

// Yes button click handler
yesBtn.addEventListener("click", showCelebration);

// No button click handler - spawn Yes buttons on mobile/touch
noBtn.addEventListener("click", () => {
  spawnYesButton();
  // Also move the No button
  moveNoButton();
});
