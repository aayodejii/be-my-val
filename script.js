// Valentine's Day Interactive Page

// Main elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Detect if device is touch-based (mobile)
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Desktop: No button escapes from cursor
if (!isMobile) {
    const escapeDistance = 150; // How close cursor needs to be to trigger escape
    const moveDistance = 200;   // How far the button moves

    document.addEventListener('mousemove', (e) => {
        const rect = noBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        // Calculate distance from cursor to button center
        const deltaX = e.clientX - btnCenterX;
        const deltaY = e.clientY - btnCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < escapeDistance) {
            // Calculate escape direction (opposite of cursor)
            const angle = Math.atan2(deltaY, deltaX);
            let newX = btnCenterX - Math.cos(angle) * moveDistance;
            let newY = btnCenterY - Math.sin(angle) * moveDistance;

            // Keep within viewport bounds with padding
            const padding = 20;
            const btnWidth = rect.width;
            const btnHeight = rect.height;

            newX = Math.max(padding + btnWidth / 2, Math.min(window.innerWidth - padding - btnWidth / 2, newX));
            newY = Math.max(padding + btnHeight / 2, Math.min(window.innerHeight - padding - btnHeight / 2, newY));

            // Apply position
            noBtn.style.position = 'fixed';
            noBtn.style.left = `${newX - btnWidth / 2}px`;
            noBtn.style.top = `${newY - btnHeight / 2}px`;
            noBtn.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
        }
    });
}

// Yes button click handler
yesBtn.addEventListener('click', () => {
    console.log('Yes clicked!');
    // TODO: Show celebration
});

// No button click handler (for mobile)
noBtn.addEventListener('click', () => {
    if (isMobile) {
        console.log('No clicked on mobile!');
        // TODO: Spawn more Yes buttons
    }
});
