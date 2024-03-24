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

//btn1
var buttonOne = document.getElementById("one");
var audioOne = document.getElementById("audioOne");

buttonOne.addEventListener("click", function() {
    audioOne.play();
});
