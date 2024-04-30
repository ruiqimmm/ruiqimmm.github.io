function setup() {
    let cnv = createCanvas(100, 100);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator(300);
    background(220);
    text('tap to play', 20, 20);
  }
  
  function playOscillator() {
    osc.start();
    osc.amp(0.5);  
    // start at 700Hz
    osc.freq(60);
    // ramp to 60Hz over 0.7 seconds
    osc.freq(0, 60);
    osc.amp(0, 0.5, 60);
  }