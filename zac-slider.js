function ZacSlider(options) {

  this.slider = null;
  this._wrapSlider(options.elem);

  this.delay = options.delay || null;
  this.slides = this.slider.querySelectorAll('.slide');
  this.currentSlide = 0;
  if (this.delay) {
    this.slideInterval = setInterval(this._nextSlide.bind(this), this.delay);
  }
  this.isPlaying = true;

  this.pauseButton = document.querySelector('#pause');
  this.prevButton = document.querySelector('#prev');
  this.nextButton = document.querySelector('#next');
  this.controls = document.querySelectorAll('.controls');

  this.controls.forEach(function(item){
    item.style.display = 'block';
  });

  this.slides.forEach(function(item){
    item.style.position = 'absolute';
  });

  this.nextButton.onclick = this.onNext.bind(this);
  this.prevButton.onclick = this.onPrev.bind(this);
  this.pauseButton.onclick = this.onPauseButton.bind(this);
};

//Wrapper
ZacSlider.prototype._wrapSlider = function(elem) {
  var wrapper = document.createElement('div');
  wrapper.className = 'zac-slider';
  elem.before(wrapper);
  this.slider = wrapper.appendChild(elem);
};

//Pause button
ZacSlider.prototype.onPauseButton = function() {
  if (this.isPlaying) {
    this.stopSlideshow()
  } else {
    this.playSlideshow()
  }
};

ZacSlider.prototype.playSlideshow = function() {
  this.pauseButton.innerHTML = 'Stop';
  this.isPlaying = true;
  this.slideInterval = setInterval(this._nextSlide.bind(this), this.delay);
};

ZacSlider.prototype.stopSlideshow = function() {
  this.pauseButton.innerHTML = 'Play';
  this.isPlaying = false;
  clearInterval(this.slideInterval);
};

//Next/Prev buttons
ZacSlider.prototype.onNext = function() {
  this.stopSlideshow();
  this._nextSlide();
};

ZacSlider.prototype.onPrev = function() {
  this.stopSlideshow();
  this._previousSlide();
};

ZacSlider.prototype._nextSlide = function() {
  this._goToSlide(this.currentSlide + 1);
};

ZacSlider.prototype._previousSlide = function() {
  this._goToSlide(this.currentSlide - 1);
};

ZacSlider.prototype._goToSlide = function(n) {
  this.slides[this.currentSlide].className = 'slide';
  this.currentSlide = (n + this.slides.length) % this.slides.length;
  this.slides[this.currentSlide].className = 'slide showing';
};
