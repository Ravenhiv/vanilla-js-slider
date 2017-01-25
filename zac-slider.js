function ZacSlider(options) {

  this.slider = null;
  this._wrapSlider(options.elem);

  this.controls = null;
  this.delay = options.delay || null;
  this.slides = this.slider.querySelectorAll('.slide');
  this.currentSlide = 0;
  if (this.delay) {
    this.slideInterval = setInterval(this._nextSlide.bind(this), this.delay);
  }
  this.isPlaying = true;
  this.width = options.width || 'auto';

  this.pause = options.pause;
  if (this.pause) {
    if (!this.controls) this.createControlsContainer();
    this.createControlsPause();
  };

  this.prevnext = options.prevnext;
  if (this.prevnext) {
    if (!this.controls) this.createControlsContainer();
    this.createControlsPrevNext();
  };

  this.slidesStyles();

};

//Styles for slides
ZacSlider.prototype.slidesStyles = function() {
  function widthType(width) {
    if (isNaN(width)) {
      return width;
    } else {
      return width + 'px';
    }
  };

  this.slides.forEach(function(item){
    item.style.position = 'absolute';
    item.style.width = widthType(this.width);
  }, this);

  var ul = this.slider.querySelector('ul');
  ul.style.width = widthType(this.width);
  ul.style.height = this.slides[0].offsetHeight + 'px';
};

//Create controls
ZacSlider.prototype.createControlsContainer = function() {
  var container = document.createElement('div');
  container.className = 'controls';
  this.controls = this.slider.appendChild(container);
  this.controls.style.display = 'block';
}

ZacSlider.prototype.createControlsPause = function() {
  var pause = document.createElement('button');
  pause.className = 'pause';
  pause.innerHTML = '&#9744;';
  this.pauseButton = this.controls.appendChild(pause);
  this.pauseButton.onclick = this.onPauseButton.bind(this);
}

ZacSlider.prototype.createControlsPrevNext = function() {
  var prev = document.createElement('button');
  prev.className = 'prev';
  prev.innerHTML = '<';
  this.prevButton = this.controls.appendChild(prev);
  this.prevButton.onclick = this.onPrev.bind(this);

  var next = document.createElement('button');
  next.className = 'next';
  next.innerHTML = '>';
  this.nextButton = this.controls.appendChild(next);
  this.nextButton.onclick = this.onNext.bind(this);
}

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
  this.pauseButton.innerHTML = '&#9744;';
  this.isPlaying = true;
  this.slideInterval = setInterval(this._nextSlide.bind(this), this.delay);
};

ZacSlider.prototype.stopSlideshow = function() {
  this.pauseButton.innerHTML = '&#10148;';
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
