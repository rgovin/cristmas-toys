$(document).ready (function(){
  $('.video-slider').slick( {
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  })
})


// Burger

let burgerButton = document.querySelector('.menu-icon');
let welcome = document.querySelector('.welcome-interactive');
let nav = document.querySelector('.navigation-burger ');

burgerButton.addEventListener('click', openBurgerMenu);

function openBurgerMenu() {
  welcome.classList.toggle('hiddenWelcome');
  nav.classList.toggle('showNavigationBurger');
  if(burgerButton.classList.contains('burger')) {
    burgerButton.classList.remove('burger')
  } else if(!burgerButton.classList.contains('burger')) {
    burgerButton.classList.add('burger')
  }
  burgerButton.classList.toggle('_active');
}


// Gallery animation

const pictureInnerContainer = document.querySelector('.picture-inner-container');

let images = [`./assets/galery1.jpg`, `./assets/galery2.jpg`, `./assets/galery3.jpg`, `./assets/galery4.jpg`, `./assets/galery5.jpg`, `./assets/galery6.jpg`, `./assets/galery7.jpg`, `./assets/galery8.jpg`, `./assets/galery9.jpg`, `./assets/galery10.jpg`, `./assets/galery11.jpg`, `./assets/galery12.jpg`, `./assets/galery13.jpg`, `./assets/galery14.jpg`, `./assets/galery15.jpg`];
console.log (images)
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

shuffle(images);
images.map(function (adress) {
  let img = document.createElement('img');
  img = `<img class="image-gallery" src="${adress}" alt="galery1" width = "465">`;
  pictureInnerContainer.innerHTML += img;
})



// Ticket Animation
let buyPage = document.querySelector('.buy-section');
let overLay = document.querySelector('.overlay');
function showBooking() {
  console.log('sd')
  overLay.classList.add('overlay-view');
  buyPage.classList.add('show-booking');
  buyPage.classList.remove('close-booking');
  buyPage.classList.remove('buy-section');
}

function hiddenBooking() {
  console.log('sd')
  buyPage.classList.add('close-booking');
  buyPage.classList.add('buy-section');
  overLay.classList.remove('overlay-view');
  buyPage.classList.remove('show-booking');
}

document.querySelector('.buy').addEventListener('click', function () {
  showBooking();
})

document.querySelector('.close').addEventListener('click', function () {
  hiddenBooking();
})


// Slider

let items = document.querySelectorAll('.item');
let squares = document.querySelectorAll('.square');
const number = document.querySelector('.changed-num');


let currentItem = 0;
let isEnable = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length
  console.log(currentItem)
}

function hideItem(direction) {
  isEnable = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction)
  })
}

function showItem(direction) {
  isEnable = false;
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnable = true;
  })
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

function changeItemNext(n) {
  hideItem('to-left');
  changeCurrentItem(n);
  showItem('from-right');
}

function changeItemPrevious(n) {
  hideItem('to-right');
  changeCurrentItem(n);
  showItem('from-left');
}

squares.forEach((item, currentSq) => {
  item.addEventListener('click', () => {
    squares[currentItem].classList.remove('actives');
    if(currentItem < currentSq) changeItemNext(currentSq)
    if(currentItem > currentSq) changeItemPrevious(currentSq)
    squares[currentItem].classList.add('actives');
    number.innerHTML = `0${(currentItem + 1)}`
  });
});


// control with keys

window.addEventListener('keydown', function (event) {
  let pageHeight = window.pageYOffset;
  if(pageHeight <= 700) {
    if (event.keyCode == 37) {
      squares[currentItem].classList.remove('actives');
      if(isEnable) {
        previousItem(currentItem)
      }
      number.innerHTML = `0${(currentItem + 1)}`
      squares[currentItem].classList.add('actives');
    }
    if (event.keyCode == 39) {
      squares[currentItem].classList.remove('actives');
      if(isEnable) {
        nextItem(currentItem)
      }
      number.innerHTML = `0${(currentItem + 1)}`
      squares[currentItem].classList.add('actives');
    }
  }
});

// control with img arrows

document.querySelector('.control.left').addEventListener('click', function () {
  squares[currentItem].classList.remove('actives');
  if(isEnable) {
    previousItem(currentItem)
  }
  number.innerHTML = `0${(currentItem + 1)}`
  squares[currentItem].classList.add('actives');
})

document.querySelector('.control.right').addEventListener('click', function () {
  squares[currentItem].classList.remove('actives');
  if(isEnable) {
    nextItem(currentItem)
  }
  number.innerHTML = `0${(currentItem + 1)}`
  squares[currentItem].classList.add('actives');
})

// Hand swiper

const swipedetect = (el) => {
  let surface = el;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 250;
  let restraint = 150;
  let allowedTime = 500;

  surface.addEventListener('mousedown', function (e) {
    e.preventDefault();
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    
  })

  surface.addEventListener('mouseup', function (e) {
    e.preventDefault();
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if(elapsedTime < allowedTime) {
      if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if(distX > 0) {
          if(isEnable) {
            squares[currentItem].classList.remove('actives');
            previousItem(currentItem)
            squares[currentItem].classList.add('actives');
          }
        } else {
          if(isEnable) {
            squares[currentItem].classList.remove('actives');
            nextItem(currentItem)
            squares[currentItem].classList.add('actives');
          }
        }
      }                       
    }
  })

  surface.addEventListener('touchstart', function (e) {
    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  })

  surface.addEventListener('touchmove', function (e) {
    e.preventDefault();
  })

  surface.addEventListener('touchend', function (e) {
    
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    console.log (startTime)
    elapsedTime = new Date().getTime() - startTime;
    console.log (elapsedTime)
    if(elapsedTime < allowedTime) {
      if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if(distX > 0) {
          if(isEnable) {
            squares[currentItem].classList.remove('actives');
            previousItem(currentItem)
            squares[currentItem].classList.add('actives');
          }
        } else {
          if(isEnable) {
            squares[currentItem].classList.remove('actives');
            nextItem(currentItem)
            squares[currentItem].classList.add('actives');
          }
        }
      }                         
    }
    e.preventDefault();
  })
}

let el = document.querySelector('.item-container');
swipedetect(el);


// Video
document.onkeydown = function (e) {
  if(e.keyCode == 32) e.preventDefault();
};

// Get elements
const player = document.querySelector('.video-section');

const video = document.querySelector('.video-player');

const play = document.querySelectorAll('.toggle');

const minus = document.querySelector('.data-skip-minus');

const plus = document.querySelector('.data-skip-plus');

const progress = document.querySelector('.progress');

const volumeOn = document.querySelector('.volume-turn');

const volume = document.querySelector('.volume');

const screen = document.querySelector('.full-screen');




// Build functions

function togglePlay() {

  video[video.paused ? 'play' : 'pause']();

}

function updateButton() {

  if(this.played) play[0].hidden = true;
}

function updateButtonToPause() {
  if(this.paused) play[0].hidden = false;
}


function handleRange() {

  video.volume = this.value;

}


function volumeOff() {

  if(!video.muted) {
    document.getElementById('volumeTurn').src = "./assets/frames/muteOff.svg";
    video.muted = true;

  } else {
    document.getElementById('volumeTurn').src = "./assets/frames/volume.svg";
    video.muted = false;

  }
}

function fullScreen() {

  if(!document.fullscreenElement) {
    video.requestFullscreen()
  } else {
    document.exitFullscreen();
  }

}

function changeProgress(e) {

  let scrubTime = Math.floor((e.offsetX / progress.offsetWidth) * video.duration);
  video.currentTime = scrubTime;
}

function rangeMove() {

  progress.value = (Math.floor(video.currentTime) / (Math.floor(video.duration) / 100));

}

function videoSlider() {

  let src = document.getElementById('video').getAttribute('src');

  if(src == "./assets/video/video1.mp4") {

    document.getElementById('video').src = "./assets/video/video2.mp4";
    document.getElementById('video').poster = "./assets/video2.png";
  } else if(src == "./assets/video/video2.mp4") {
    document.getElementById('video').poster = "./assets/video3.jpg";
    document.getElementById('video').src = "./assets/video/video1.mp4";

  }
}

function changeIcon() {

  if(video.paused) {
    document.getElementById('play').src = "./assets/frames/Frame-1.svg";
  } else if(video.played) {
    document.getElementById('play').src = "./assets/frames/pause.svg";
  }
}


function videoSpeedMinus() {
  video.playbackRate = video.playbackRate - 0.25;
}

function videoSpeedPlus() {
  video.playbackRate = video.playbackRate + 0.25;
}
//TODO Dont't work ChangeColor for volume and in time progress.
//TODO Start volume is very hi 
//TODO Changes is not accurate

// filling in progress bars

  const changeColor = (value) => `
  linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

  function changeColorForVolume() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #fff ${value * 100}%, white 100%)`
  }


  // Hook up eventsListener

  // Start/Pause
  video.addEventListener('click', togglePlay);
  play[0].addEventListener('click', togglePlay);
  play[1].addEventListener('click', togglePlay);
  player.addEventListener('click', changeIcon);
  // updateButton
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButtonToPause);
  //slider
  // minus.addEventListener ('click', videoSlider);
  // plus.addEventListener ('click', videoSlider);

  // Volume progress

  volume.addEventListener('change', handleRange);
  volume.addEventListener('mousemove', handleRange);
  volume.addEventListener('change', changeColorForVolume);
  volume.addEventListener('input', changeColorForVolume);

// Progressbar, update color fill and progress  in progressbar

  progress.addEventListener('input', changeColor);
  progress.addEventListener('change', changeColor);
  progress.addEventListener('input', () => {
    video.currentTime = progress.value * video.duration / 100;
  });
  video.addEventListener('timeupdate', () => {
    if (!isNaN(video.duration)) {
      progress.value = video.currentTime * 100 / video.duration;
      progress.style.background = changeColor(progress.value);
    }
  });

  // Volume turn

  volumeOn.addEventListener('click', volumeOff)

  // FullScreen

  screen.addEventListener('click', fullScreen)


  // Keycode
  window.addEventListener('keydown', function (event) {


    if(event.keyCode == 32) {
      togglePlay();
      changeIcon();
    }

    if(event.shiftKey && event.keyCode == 190) {
      videoSpeedPlus()
    }

    if(event.shiftKey && event.keyCode == 188) {
      videoSpeedMinus()
    }

    if(event.keyCode == 77) {
      volumeOff()
    }

    if(event.keyCode === 70) {

      if(!document.fullscreenElement) {
        video.requestFullscreen()
      } else {
        document.exitFullscreen();
      }
    }

  });

  // Video-slider

 







