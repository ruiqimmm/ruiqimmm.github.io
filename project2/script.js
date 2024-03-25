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
window.addEventListener('resize', adjustVolume);

function adjustVolume() {
    var volume = calculateVolume(); // 根据页面大小计算音量
    var audioElements = document.getElementsByTagName("audio");
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].volume = volume;
    }
}

function calculateVolume() {
    var volume = 0.5; // 默认音量为 0.5
    var windowWidth = window.innerWidth;
    
    if (windowWidth < 500) { 
        volume = 0.2; // 较小的页面设置较低的音量 
    } else if (windowWidth < 1000 && windowWidth > 500) { 
        volume = 0.6; // 较小的页面设置较低的音量 
    } else if (windowWidth > 2000) {
        volume = 0.8; // 较大的页面设置较高的音量
    } else if (windowWidth > 3000) {
        volume = 1; // 较大的页面设置较高的音量
    }

    return volume;
}
var initialVolume = calculateVolume();
console.log("Initial volume: " + initialVolume);


  
  
//
function calculatePitch() {
    var windowWidth = window.innerWidth;
    var pitch = 1; // 默认音调为 1

    if (windowWidth < 1000) {
        pitch = 0.5; // 较小的页面设置较低的音调
    } else if (windowWidth > 1500) {
        pitch = 2; // 较大的页面设置较高的音调
    }

    return pitch;
}

// 获取计算后的音调
var pitch = calculatePitch();

// 应用音调设置到所有音频元素
var audios = document.getElementsByTagName('audio');
for (var i = 0; i < audios.length; i++) {
    audios[i].playbackRate = pitch;
}
