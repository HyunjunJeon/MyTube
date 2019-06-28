const videoContainer = document.getElementById("customVideoPlayer");
const videoPlayer = document.querySelector("#customVideoPlayer video");
const playBtn = document.getElementById("videoPlayBtn");
const volumeBtn = document.getElementById("videoVolumeBtn");
const fullScreenBtn = document.getElementById("videoFullScreenBtn");
const videoCurrentTime = document.getElementById("videoCurrentTime");
const videoTotalTime = document.getElementById("videoTotalTime");
const videoVolumeRange = document.getElementById("videoVolume");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    videoVolumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    videoVolumeRange.value = 0;
  }
}

function handleVolumeClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        videoVolumeRange.value = videoPlayer.volume;
    }else{
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        videoVolumeRange.value = 0;
    }
}

function handleExitFullScreenClick(){
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener("click", handleFullScreenClick);
    if(document.exitFullscreen){ // 최신 브라우저는 걸러냄...
        document.exitFullscreen();
    }else if(document.mozCancelFullScreen){ // FireFox
        document.mozCancelFullScreen();
    }else if(document.webkitExitFullscreen){// Chrome
        document.webkitExitFullscreen();
    }else if(document.msExitFullscreen){ // IE
        document.msExitFullscreen();
    }
}

function handleFullScreenClick(){
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener("click", handleFullScreenClick);
    fullScreenBtn.addEventListener("click", handleExitFullScreenClick);
}

const dateFormat = (seconds) => {
    const secondsNumber = parseInt(seconds, 10);
    
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60; 

    if(hours < 10){
        hours = `0${hours}`;
    }
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    if(totalSeconds < 10){
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
}

function getVideoCurrentTime(){
    if(videoPlayer.paused == false){
        videoCurrentTime.innerHTML = dateFormat(Math.floor(videoPlayer.currentTime));
    }    
}

function setVideoTotalTime(){
    const totalTime = dateFormat(videoPlayer.duration);
    videoTotalTime.innerHTML = totalTime;
    setInterval(getVideoCurrentTime, 1000);
}

function handleVideoEnded(){
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleVideoVolumeDrag(event){
    const {
        target: { value }
    } = event;
    videoPlayer.volume = value;
    if(value >= 0.5){
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }else if(value >= 0.1){
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    }else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", handleFullScreenClick);
  videoPlayer.addEventListener("loadedmetadata", setVideoTotalTime);
  videoPlayer.addEventListener("ended", handleVideoEnded);
  videoVolumeRange.addEventListener("input", handleVideoVolumeDrag);
}

if (videoContainer) {
  init();
}