console.log ("Привет! Оценка - 30 баллов 1. воспроизвести исходное приложение 2. обязательный дополнительный функционалункционал \n 3. Дополнительный фукционал - слайдер (2 видео, через кнопки на плеере <-->)\n Скорость перемотки только на кнопках ")

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
minus.addEventListener ('click', videoSlider);
plus.addEventListener ('click', videoSlider);

// Volume and Time range

volume.addEventListener('change', handleRange);
volume.addEventListener('mousemove', handleRange);

progress.addEventListener ('click', changeProgress);
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








