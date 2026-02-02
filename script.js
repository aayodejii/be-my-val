// Valentine's Day Interactive Page

// Main elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Desktop: No button escapes from cursor
const escapeDistance = 120;

// Predefined safe positions using viewport units
const safePositions = [
    { left: '10vw', top: '10vh' },
    { left: '70vw', top: '10vh' },
    { left: '10vw', top: '70vh' },
    { left: '70vw', top: '70vh' },
    { left: '40vw', top: '10vh' },
    { left: '40vw', top: '70vh' },
    { left: '10vw', top: '40vh' },
    { left: '70vw', top: '40vh' },
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
    noBtn.style.position = 'fixed';
    noBtn.style.left = pos.left;
    noBtn.style.top = pos.top;
    noBtn.style.zIndex = '9999';
}

document.addEventListener('mousemove', (e) => {
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

// Yes button click handler
yesBtn.addEventListener('click', () => {
    console.log('Yes clicked!');
    // TODO: Show celebration
});

// No button click handler
noBtn.addEventListener('click', () => {
    console.log('No clicked!');
    // TODO: Mobile behavior - spawn Yes buttons
});
