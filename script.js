const waveLayers = document.querySelectorAll('.wave');
const musicButton = document.getElementById('music-button');
const music = document.getElementById('background-music');
const filterEffect = document.createElement('div');
const title = document.getElementById('title');
let isDragging = false;
let startX, scrollLeft;

const startDragging = (e) => {
    isDragging = true;
    startX = (e.pageX || e.touches[0].pageX) - waveLayers[0].offsetLeft;
    scrollLeft = parseInt(getComputedStyle(waveLayers[0]).backgroundPositionX, 10) || 0;
};

const stopDragging = () => {
    isDragging = false;
};

const dragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - waveLayers[0].offsetLeft;
    const walk = x - startX;

    waveLayers.forEach(layer => {
        const containerWidth = layer.clientWidth;
        console.log(containerWidth)
        let newPosition = scrollLeft + walk;

        // Limit the sliding to the bounds of the background image
        // const minPosition = Math.min(0, containerWidth - backgroundSize);
        const minPosition = -1*Math.abs(1200-containerWidth);
        const maxPosition = 0;
        if (newPosition > maxPosition) {
            newPosition = maxPosition;
        } else if (newPosition < minPosition) {
            newPosition = minPosition;
        }

        layer.style.backgroundPositionX = `${newPosition}px`;
    });
};

// Play music on button click
filterEffect.id = 'filter-effect';
document.body.appendChild(filterEffect);

musicButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicButton.textContent = 'Close';
        musicButton.classList.add('playing');
        filterEffect.classList.add('sliding');
        filterEffect.classList.remove('expanding');
        title.classList.add('hidden');

        // Activate shadows as the filter minimizes
        setTimeout(() => {
            waveLayers.forEach(layer => {
                layer.classList.add('active');
            });
        }, 1500); // Delay matching the filter minimization
    } else {
        music.pause();
        musicButton.textContent = 'Open';
        musicButton.classList.remove('playing');
        filterEffect.classList.remove('sliding');
        filterEffect.classList.add('expanding');
        title.classList.remove('hidden');

        // Deactivate shadows as the filter expands
        setTimeout(() => {
            waveLayers.forEach(layer => {
                layer.classList.remove('active');
            });
        }, 1000); // Delay before shadows are removed
    }
});

waveLayers.forEach(layer => {
    layer.addEventListener('mousedown', startDragging);
    layer.addEventListener('touchstart', startDragging);

    layer.addEventListener('mousemove', dragMove);
    layer.addEventListener('touchmove', dragMove);

    layer.addEventListener('mouseleave', stopDragging);
    layer.addEventListener('mouseup', stopDragging);
    layer.addEventListener('touchend', stopDragging);
});

