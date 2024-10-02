let currentSlide = 0;
const music_dur = 0.5;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    const slideContainer = document.querySelector('.slides');
    slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    const currentSlideElement = slides[currentSlide];
    const note = currentSlideElement.getAttribute('data-note');
    playNote(noteFrequencies[note][0], noteFrequencies[note][1]);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        changeSlide(1);
    } else if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    }
});

const noteFrequencies = {
    'G': [392, 1],
    'A3': [440, 1.5],
    'A2': [440, 0.5],
    'B2': [493.88, 0.5],
    'B3': [493.88, 1.5],
    'E': [659.26, 1],
    'D': [587.33, 1],
    'Blank': [0, 0]
};

function playNote(frequency, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + (duration * music_dur));
}

document.querySelectorAll('.note').forEach(noteDiv => {
    noteDiv.addEventListener('click', () => {
        const note = noteDiv.getAttribute('data-note');
        const frequency = noteFrequencies[note];
        playNote(frequency);
    });
});

let audio;

document.getElementById('audio-pic').addEventListener('click', function() {
    console.log('<3');
    if (!audio) {
        audio = new Audio('lana.mp3');
    }
    audio.play();
});

window.addEventListener('beforeunload', function() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
});