window.onload = function() {

  var slides = document.querySelectorAll('#slides .slide');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide, 2000);
  var isPlaying = true;
  var pauseButton = document.querySelector('#pause');
  var prevButton = document.querySelector('#prev');
  var nextButton = document.querySelector('#next');

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function previousSlide() {
    goToSlide(currentSlide - 1);
  }

  function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'slide showing';
  }

  function playSlideshow() {
    pauseButton.innerHTML = 'Stop';
    isPlaying = true;
    slideInterval = setInterval(nextSlide, 2000);
  }

  function stopSlideshow() {
    pauseButton.innerHTML = 'Play';
    isPlaying = false;
    clearInterval(slideInterval);
  }

  pauseButton.onclick = function() {
    if (isPlaying) {
      stopSlideshow()
    } else {
      playSlideshow()
    }
  }

  prevButton.onclick = function() {
    stopSlideshow();
    previousSlide();
  }

  nextButton.onclick = function() {
    stopSlideshow();
    nextSlide();
  }

};
