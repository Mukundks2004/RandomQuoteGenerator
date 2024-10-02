let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    const slideContainer = document.querySelector('.slides');
    slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        changeSlide(1);
    } else if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    }
});