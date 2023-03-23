var carousel = document.querySelector('.carousel');
var carouselContent = document.querySelector('.carousel-content');
var slides = document.querySelectorAll('.slide');
var arrayOfSlides = Array.prototype.slice.call(slides);
var carouselDisplaying;
var screenSize;
setScreenSize();
var lengthOfSlide;

function slideBox() {
   var EndSlider = carouselContent.lastElementChild.cloneNode(true);
   EndSlider.style.left = (-lengthOfSlide) + "px";
   carouselContent.insertBefore(EndSlider, carouselContent.firstChild);
}


function removeBox() {
  var StartSlider = carouselContent.firstElementChild;
  StartSlider.parentNode.removeChild(StartSlider);
}

function moveSlidesRight() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  var width = 0;

  slidesArray.forEach(function(el, i){
    el.style.left = width + "px";
    width += lengthOfSlide;
  });
  slideBox();
}
moveSlidesRight();

function moveSlidesLeft() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  slidesArray = slidesArray.reverse();
  var maxWidth = (slidesArray.length - 1) * lengthOfSlide;

  slidesArray.forEach(function(el, i){
    maxWidth -= lengthOfSlide;
    el.style.left = maxWidth + "px";
  });
}

window.addEventListener('resize', setScreenSize);

function setScreenSize() {
  if ( window.innerWidth >= 900 ) {
    carouselDisplaying = 3;
  } else if ( window.innerWidth >= 300 ) {
    carouselDisplaying = 2;
  } else {
    carouselDisplaying = 1;
  }
  getScreenSize();
}

function getScreenSize() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  lengthOfSlide = ( carousel.offsetWidth  / carouselDisplaying );
  var initialWidth = -lengthOfSlide;
  slidesArray.forEach(function(el) {
    el.style.width = lengthOfSlide + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
}


var rightNav = document.querySelector('.nav-right');
rightNav.addEventListener('click', moveToLeft);

var moving = true;
function moveRight() {
  if ( moving ) {
    moving = false;
    var EndSlider = carouselContent.lastElementChild;
    EndSlider.parentNode.removeChild(EndSlider);
    carouselContent.insertBefore(EndSlider, carouselContent.firstChild);
    removeBox();
    var StartSlider = carouselContent.firstElementChild;
    StartSlider.addEventListener('transitionend', activateOnce);
    moveSlidesRight();
  }
}

function activateOnce() {
  var StartSlider = carouselContent.firstElementChild;
  moving = true;
  StartSlider.removeEventListener('transitionend', activateOnce);
}

var leftNav = document.querySelector('.nav-left');
leftNav.addEventListener('click', moveRight);

// var moveToLeftAgain = true;

function moveToLeft() {
  if ( moving ) {
    moving = false;
    removeBox();
    var StartSlider = carouselContent.firstElementChild;
    StartSlider.addEventListener('transitionend', replaceToEnd);
    moveSlidesLeft();
  }
}

function replaceToEnd() {
  var StartSlider = carouselContent.firstElementChild;
  StartSlider.parentNode.removeChild(StartSlider);
  carouselContent.appendChild(StartSlider);
  StartSlider.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
  slideBox();
  moving = true;
  StartSlider.removeEventListener('transitionend', replaceToEnd);
}




carouselContent.addEventListener('mousedown', seeMovement);

var initialX;
var initialPos;
function seeMovement(e) {
  initialX = e.clientX;
  displayPost();
  carouselContent.addEventListener('mousemove', sloveMove);
  document.addEventListener('mouseup', MouseMovements);
}

function sloveMove(e) {
  if ( moving ) {
    var movingX = e.clientX;
    var difference = initialX - movingX;
    if ( Math.abs(difference) < (lengthOfSlide/4) ) {
      sloveMoveSlides(difference);
    }  
  }
}

function displayPost() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  initialPos = [];
  slidesArray.forEach(function(el){
    var left = Math.floor( parseInt( el.style.left.slice(0, -2 ) ) ); 
    initialPos.push( left );
  });
}

function sloveMoveSlides(newX) {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  slidesArray.forEach(function(el, i){
    var oldLeft = initialPos[i];
    el.style.left = (oldLeft + newX) + "px";
  });
}

function MouseMovements(e) { 
  var finalX = e.clientX;
  if ( initialX - finalX > 0) {
    moveRight();
  } else if ( initialX - finalX < 0 ) {
    moveToLeft();
  }
  document.removeEventListener('mouseup', MouseMovements);
  carouselContent.removeEventListener('mousemove', sloveMove);
}


const PopModalBox = document.getElementById("popup-box");
const popBtn = document.getElementById("popup-btn");

popBtn.addEventListener("click", () => {
  PopModalBox.style.display = "block";
});


const popupCloseBtn = document.getElementById("popup-close-btn");

popupCloseBtn.addEventListener("click", () => {
    PopModalBox.style.display = "none";
});
