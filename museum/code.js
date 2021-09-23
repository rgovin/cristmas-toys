// Ticket Animation
let buyPage = document.querySelector('.buy-section');

function showBooking () {
  console.log ('sd')
  buyPage.classList.add('show-booking')
  buyPage.classList.remove('close-booking');
  buyPage.classList.remove('buy-section');
}

function hiddenBooking () {
  console.log ('sd')
  buyPage.classList.add('close-booking');
  buyPage.classList.add('buy-section');
  buyPage.classList.remove('show-booking');
}

document.querySelector('.buy').addEventListener('click',function (){
  showBooking ();
})

document.querySelector('.close').addEventListener('click',function (){
  hiddenBooking ();
})


// Slider

let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnable = true;

function changeCurrentItem (n) {
  currentItem =  (n + items.length) %  items.length
}

function hideItem (direction) {
  isEnable = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('active', direction)
  })
}

function showItem (direction) {
  isEnable = false;
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('next', direction);
      this.classList.add ('active');
      isEnable = true;
  })
}

function previousItem (n) {
  hideItem ('to-right');
  changeCurrentItem (n - 1);
  showItem ('from-left');
}

function nextItem (n) {
  hideItem ('to-left');
  changeCurrentItem (n + 1);
  showItem ('from-right');
}

document.querySelector('.control.left').addEventListener('click',function (){
  if (isEnable) {
    previousItem (currentItem) 
  }
})

document.querySelector('.control.right').addEventListener('click',function (){
  if (isEnable) {
    nextItem (currentItem) 
  }
})


// Video
document.onkeydown = function(e){
  if (e.keyCode == 32) e.preventDefault();
};

// Get elements
const player = document.querySelector ('.video-section');

const video = document.querySelector ('.video-player');

const play = document.querySelectorAll ('.toggle');

const minus = document.querySelector ('.data-skip-minus');

const plus = document.querySelector ('.data-skip-plus');

const progress = document.querySelector ('.progress');

const volumeOn = document.querySelector ('.volume-turn');

const volume = document.querySelector ('.volume');

const screen = document.querySelector ('.full-screen');




// Build functions

function togglePlay () {

   video [ video.paused ? 'play' : 'pause'] ();

}

function updateButton () {

   this.played ? play[0].hidden = true : play[0].hidden = false;

}


 function  handleRange () {

    video.volume = this.value;

 }   


 function volumeOff () {

   if (!video.muted) {
    video.muted = true
    } else {
    video.muted = false;
    }
 }

 function fullScreen () {

    if (!document.fullscreenElement) {
        video.requestFullscreen()
      } else {
        document.exitFullscreen();
      }

 }

 function changeProgress (e) {
   
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
 }

 function rangeMove () {
    
    progress.value = (Math.floor(video.currentTime) / (Math.floor(video.duration) / 100));

 }

 function videoSlider() {

  let src = document.getElementById('video').getAttribute('src');
  
  if (src == "./assets/video/video1.mp4") {

    document.getElementById('video').src = "./assets/video/video2.mp4";
    document.getElementById('video').poster = "./assets/video2.png";
  } else if (src == "./assets/video/video2.mp4") {
    document.getElementById('video').poster = "./assets/video3.jpg";
    document.getElementById('video').src = "./assets/video/video1.mp4";

  }

}
  function changeIcon () {
   
    
  if (video.paused) {
   
      document.getElementById('play').src = "./assets/frames/pause.svg";
     
  } else if (video.played) {
    
      document.getElementById('play').src = "./assets/frames/Frame-1.svg";
           
  }
}

  function videoSpeedMinus () {
  video.playbackRate = video.playbackRate - 0.25;
  }
  
  function videoSpeedPlus () {
      video.playbackRate = video.playbackRate + 0.25;
      }
//TODO Dont't work ChangeColor for volume and in time progress.
//TODO Start volume is very hi 
//TODO Changes is not accurate
      function changeColor() {
        console.log ('sd')
        const value = this.value;
        this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
      }


// Hook up eventsListener

// Start/Pause
video.addEventListener ('click', togglePlay);
play[0].addEventListener ('click', togglePlay);
play[1].addEventListener ('click', togglePlay);
player.addEventListener ('click', changeIcon);
// updateButton
video.addEventListener ('play', updateButton);
video.addEventListener ('pause', updateButton);
//slider
// minus.addEventListener ('click', videoSlider);
// plus.addEventListener ('click', videoSlider);

// Volume and Time range

volume.addEventListener('change', handleRange);
volume.addEventListener('mousemove', handleRange);

progress.addEventListener('input', changeColor);
progress.addEventListener('change', changeColor);

video.addEventListener('timeupdate', rangeMove);


// Volume turn

volumeOn.addEventListener ('click', volumeOff)

// FullScreen

screen.addEventListener ('click', fullScreen)


// Keycode
window.addEventListener ('keydown', function (event) {
        

    if (event.keyCode == 32) {
        togglePlay ();
        changeIcon ();
    } 

    if (event.keyCode == 190) {
        videoSpeedPlus ()
    }

    if (event.keyCode == 188) {
        videoSpeedMinus ()
    }

    if (event.keyCode == 77) {
        volumeOff ()
    }

    if (event.keyCode === 70) {

        if (!document.fullscreenElement) {
            video.requestFullscreen()
          } else {
            document.exitFullscreen();
          }
    }

});








