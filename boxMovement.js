const card = document.querySelector('.card');

let isDragging = false;
let offsetX, offsetY;

card.addEventListener('mousedown', (e) => {
    isDragging = true;

    offsetX = e.clientX - card.offsetLeft;
    offsetY = e.clientY - card.offsetTop;
    card.style.cursor = 'grabbing';
});


document.addEventListener('mouseup', () => {
    isDragging = false;
    card.style.cursor = 'grab';
});


document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        // Move the card to follow the mouse, offset by initial click position
        card.style.left = `${e.clientX - offsetX}px`;
        card.style.top = `${e.clientY - offsetY}px`;
    }
});
