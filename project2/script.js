// script.js

function updateClock() {
    var now = new Date();
    var years = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day; 
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var timeString = years + ' ' + month + ' ' + day + ' ' + hours + ':' + minutes + ':' + seconds; // Corrected the concatenation

    document.getElementById('clock').textContent = timeString; // Corrected ID to 'clock'
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();

var preloadAudio = new Audio('1.wav');
preloadAudio.play();
preloadAudio.pause();

function playMusic(audioId) {
    var audio = document.getElementById(audioId);
    audio.playbackRate = 2;
    audio.play();
}

function adjustVolume() {
    var volume = document.getElementById("volumeSlider").value;
    var audioElements = document.getElementsByTagName("audio");
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].volume = volume;
