// Define the p5.js sketch
let s1 = function (sketch) {
  let osc;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(100, 100);
    cnv.parent("sound");
    osc = new p5.Oscillator(300);
    sketch.background(220);
    sketch.text('🎵', 10, 20);
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

// Create a new p5.js instance with the sketch
let mySketch = new p5(s1);

// Function to update time every minute and trigger playOscillator
function updateTime() {
  let currentTime = new Date();
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes === 0) {
    mySketch.playOscillator();
  }
}

// Set an interval to check the time and trigger playOscillator if necessary
setInterval(updateTime, 60000); // Check every minute


// 第二个 canvas 的 p5.js 实例
let s2 = function (sketch) {
  let synth, soundLoop;
  let notePattern = [71, 62, 57, 64, 45, 56, 67, 48, 59, 50];

  sketch.setup = function () {
    let cnv = sketch.createCanvas(100, 100);
    cnv.parent("sound2");
    cnv.mousePressed(canvasPressed);
    sketch.colorMode(sketch.HSB);
    sketch.background(0, 0, 86);
    sketch.text('🎵', 10, 20);

    // 设置声音循环
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

// 创建第二个 p5.js 实例
new p5(s2);

// 第三个 canvas 的 p5.js 实例
let s3 = function (sketch) {
  let monoSynth, soundLoop;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(100, 100);
    cnv.parent("sound3");
    cnv.mousePressed(playSynth);
    sketch.background(220);
    sketch.textAlign(sketch.CENTER);
    sketch.text('🎵 ', 10, 20);

    monoSynth = new p5.MonoSynth();
  }


  function playSynth() {
    sketch.userStartAudio();

    let note = sketch.random(['Fb4', 'G4', 'D4', 'C3', 'A5', 'B4']);
    // 音符速度（音量，范围从 0  1）
    let velocity = 0.2 + Math.random() * 0.4;
    // 从现在开始的时间（以秒为单位）
    let time = 0.5;
    // 音符持续时间（在这里你应该提供一个具体的值）
    let dur = sketch.random(0.2, 0.6); // 产生一个 0.2 到 0.6 之间的随机值

    monoSynth.play(note, velocity, time, dur);
  }
};

new p5(s3);


let s4 = function (sketch) {
  let osc, playing, freq, amp;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(300, 100);
    cnv.parent("sound4");
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('sine');
  }

  sketch.draw = function () {
    sketch.background(220);
    freq = sketch.constrain(sketch.map(sketch.mouseX, 0, sketch.width, 100, 500), 100, 500);
    amp = sketch.constrain(sketch.map(sketch.mouseY, sketch.height, 0, 0, 1), 0, 1);

    sketch.text('🎵', 10, 20);
    sketch.text('freq: ' + freq, 20, 40);
    sketch.text('amp: ' + amp, 20, 60);

    if (playing) {
      // smooth the transitions by 0.1 seconds
      osc.freq(freq, 0.1);
      osc.amp(amp, 0.1);
    }
  }

  function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    osc.start();
    playing = true;
  }

  sketch.mouseReleased = function () {
    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);
    playing = false;
  }

  // Note velocity (volume, ranging from 0.2 to 0.6)
  let velocity = 0.2 + sketch.random() * 0.4;
};

// 创建第四个 p5.js 实例
new p5(s4);

// 第五个 canvas 的 p5.js 实例
let s5 = function (sketch) {
  let fft, noise, filter;

  sketch.setup = function () {
    let cnv = sketch.createCanvas(300, 100);
    cnv.parent("sound5");
    cnv.mouseOver(makeNoise);
    sketch.fill(255, 0, 255);

    filter = new p5.BandPass();
    noise = new p5.Noise();
    noise.disconnect();
    noise.connect(filter);

    fft = new p5.FFT();
  }

  sketch.draw = function () {
    sketch.background(220);

    // set the BandPass frequency based on mouseX
    let freq = sketch.map(sketch.mouseX, 0, sketch.width, 20, 10000);
    freq = sketch.constrain(freq, 0, 22050);
    filter.freq(freq);
    // give the filter a narrow band (lower res = wider bandpass)
    filter.res(200);

    // draw filtered spectrum
    let spectrum = fft.analyze();
    sketch.noStroke();
    for (let i = 0; i < spectrum.length; i++) {
      let x = sketch.map(i, 0, spectrum.length, 0, sketch.width);
      let h = -sketch.height + sketch.map(spectrum[i], 0, 255, sketch.height, 0);
      sketch.rect(x, sketch.height, sketch.width / spectrum.length, h);
    }
    if (!noise.started) {
      sketch.text('🎵', 10, 20, sketch.width - 20);
    } else {
      sketch.text('Frequency: ' + sketch.round(freq) + 'Hz', 20, 20, sketch.width - 20);
    }
  }

  function makeNoise() {
    // see also: `userStartAudio()`
    noise.start();
    noise.amp(0.5, 0.2);
  }

  sketch.mouseReleased = function () {
    noise.amp(0, 0.2);
  }
};

// 创建第五个 p5.js 实例
new p5(s5);
