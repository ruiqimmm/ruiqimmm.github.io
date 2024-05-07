// 第一个 canvas 的 p5.js 实例
let s1 = function (sketch) {
  let osc, soundLoop;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(100, 100);
    cnv.parent("sound");
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator(300);
    sketch.background(230);
    sketch.text('- - -', 10, 20);
  }

  function playOscillator() {
    osc.start();
    osc.amp(0.7);
    // start at 700Hz
    osc.freq(60);
    // ramp to 60Hz over 0.7 seconds
    osc.freq(0, 60);
    osc.amp(0, 0.5, 60);
  }
};
new p5(s1);

// 2 
let s2 = function (sketch) {
  let synth, soundLoop;
  let notePattern = [71, 62, 57, 64, 0, 45, 56, 67, 48, 59, 50, 0, 57, 62, 53, 57, 64, 46, 59, 62, 67, 67, 48, 43, 71, 62, 57, 64, 0, 45, 56, 67, 48, 59, 50, 0, 62, 71, 68, 64, 69, 64, 62, 67, 62, 71, 67, 0, 44];

  sketch.setup = function () {
    let cnv = sketch.createCanvas(100, 100);
    cnv.parent("sound2");
    cnv.mousePressed(canvasPressed);
    sketch.colorMode(sketch.HSB);
    sketch.background(230);
    sketch.text('🎵 ~', 10, 20);

    // loop!
    let intervalInSeconds = 0.9;
    soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);

    synth = new p5.MonoSynth();
  }

  function canvasPressed() {
    // 确保音频已启用
    sketch.userStartAudio();

    if (soundLoop.isPlaying) {
      soundLoop.stop();
    } else {
      // 启动循环
      soundLoop.start();
    }
  }

  function onSoundLoop(timeFromNow) {
    let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
    let note = sketch.midiToFreq(notePattern[noteIndex]);
    synth.play(note, 0.5, timeFromNow);
    sketch.background(noteIndex * 360 / notePattern.length, 50, 100);
  }
};
new p5(s2);

// 3
let s3 = function (sketch) {
  let monoSynth, soundLoop;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(100, 100);
    cnv.parent("sound3");
    cnv.mousePressed(playSynth);
    sketch.background(230);
    sketch.textAlign(sketch.CENTER);
    sketch.text('🎹', 10, 20);

    monoSynth = new p5.MonoSynth();
  }

  function playSynth() {
    sketch.userStartAudio();

    let note = sketch.random(['Fb4', 'G4', 'D4', 'C3', 'A5', 'B4']);
    let velocity = 0.2 + Math.random() * 0.4;
    // 从现在开始的时间（以秒为单位）
    let time = 0.5;
    let dur = sketch.random(0.2, 0.8);

    monoSynth.play(note, velocity, time, dur);
  }
};

new p5(s3);



let s4 = function (sketch) {
  let osc, playing, freq, amp;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(300, 100);
    cnv.parent("sound4");
    osc = new p5.Oscillator('sine');
    playSoundEvery10Sec();
  }


  sketch.draw = function () {
    if (playing) {
      sketch.background(0, 255, 0);
    } else {
      sketch.background(230);
    }
    let currentTime = new Date();
    let totalSecondsInDay = 24 * 60 * 60;
    let currentSeconds = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
    let percentageOfDay = currentSeconds / totalSecondsInDay;


    freq = sketch.map(percentageOfDay, 0, 1, 100, 1000);
    amp = 0.2;

    sketch.text('🎵', 10, 20);
    sketch.text('freq: ' + freq.toFixed(2) + ' Hz', 20, 40);
    sketch.text('amp: ' + amp.toFixed(2), 20, 60);

    if (playing) {
      osc.freq(freq, 0.2);
      osc.amp(amp, 0.2);
    }
  }

  function playOscillator() {
    osc.start();
    playing = true;
    setTimeout(stopOscillator, 500);
  }

  function stopOscillator() {
    osc.amp(0, 1);
    playing = false;
  }

  function playSoundEvery10Sec() {
    setInterval(playOscillator, 15000);
  }
};
new p5(s4);

let s5 = function (sketch) {
  let fft, noise, filter;
  let minFreq = 20;
  let maxFreq = 20000;
  let freqRange = maxFreq - minFreq;

  // Variables for modulation
  let modulationFrequency = 0.5; // Initial modulation frequency
  let modulationValue = 0; // Initial modulation value

  sketch.setup = function () {
    let cnv = sketch.createCanvas(300, 100);
    cnv.mouseOver(triggerSound); // Trigger sound on hover
    sketch.fill(255, 0, 255);
    cnv.parent("sound5");
    filter = new p5.BandPass();
    noise = new p5.Noise();
    noise.disconnect();
    noise.connect(filter);
    fft = new p5.FFT();
    sketch.text('🎵', 10, 20);

  }
  sketch.draw = function () {
    sketch.background(230);

    // Update modulation value randomly within the portion
    modulationValue = sketch.random(-freqRange / 2, freqRange / 2);

    // Map the modulation value to the frequency range
    let freq = minFreq + modulationValue;
    freq = sketch.constrain(freq, minFreq, maxFreq);
    filter.freq(freq);
    filter.res(200);

    // Draw filtered spectrum
    let spectrum = fft.analyze();
    sketch.noStroke();
    for (let i = 0; i < spectrum.length; i++) {
      let x = sketch.map(i, 0, spectrum.length, 0, sketch.width);
      let h = -sketch.height + sketch.map(spectrum[i], 0, 255, sketch.height, 0);
      sketch.rect(x, sketch.height, sketch.width / spectrum.length, h);
    }
  }

  function triggerSound() {
    // Start making noise
    noise.start();
    noise.amp(0.3); // set noise amplitude
    // Stop noise after 5 seconds
    setTimeout(stopSound, 2000);
  }

  function stopSound() {
    // Stop making noise
    noise.amp(0);
  }
};

// Create the p5.js instance
new p5(s5);


let s6 = function (sketch) {
  let synth;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(100, 100);
    cnv.parent("sound6");
    sketch.colorMode(sketch.HSB);
    sketch.background(0, 0, 86);
    sketch.text('🎵', 10, 20);
    synth = new p5.MonoSynth();
    setInterval(playRandomNote, 1000);
  }

  function playRandomNote() {
    let note = sketch.random(40, 60);
    note = sketch.midiToFreq(note);

    let timeOffset = sketch.random(0, 2);
    synth.play(note, 0.5, timeOffset);

    sketch.background(sketch.random(0, 255), sketch.random(0, 255), sketch.random(0, 255));
  }
};
new p5(s6);


let polySynth;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.parent("sound7");
  background(230);
  text('1:00', 20, 20);

  polySynth = new p5.PolySynth();
  setInterval(playSynth, 60000);
}

function playSynth() {
  userStartAudio();

  let dur = 0.5; // note duration (in seconds)
  let time = 0; // time from now (in seconds)
  let vel = 0.6; // velocity (volume, from 0 to 1)

  // Get current time
  let now = new Date();

  // Extract minutes, hour, day, and month
  let minutes = now.getMinutes();
  let hour = now.getHours();
  let day = now.getDate();
  let month = now.getMonth() + 1; // Adding 1 to get month in range [1, 12]

  // Calculate the musical note based on the sum of the digits
  let noteIndexMinutes = (minutes % 12) + Math.floor(minutes / 12);
  let noteIndexHour = (hour % 12) + Math.floor(hour / 12);
  let noteIndexDay = (day % 12) + Math.floor(day / 12);
  let noteIndexMonth = (month % 12) + Math.floor(month / 12);

  // Get the corresponding note from the index
  let notes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4']; // Notes in an octave

  // Play the synthesized notes simultaneously
  polySynth.play(notes[noteIndexMinutes], vel, time, dur);
  polySynth.play(notes[noteIndexHour], vel, time += 1, dur);
  polySynth.play(notes[noteIndexDay], vel, time += 1.3, dur);
  polySynth.play(notes[noteIndexMonth], vel, time += 1.6, dur);

  // Calculate the hue based on note indices and set the background color
  let hue = (noteIndexMinutes * 30) + (noteIndexHour * 30) + (noteIndexDay * 30) + (noteIndexMonth * 30);
  background(hue % 360, 100, 100); // Modulo 360 to keep the hue within valid range
}

new p5(s7);
