let s2 = function (sketch) {
    let synth, soundLoop;
    let notePattern = [currentSecond + 71, currentSecond + 62, currentSecond + 57, currentSecond + 64, currentSecond + 45, currentSecond + 56, currentSecond + 67, currentSecond + 48, currentSecond + 59, currentSecond + 50];
    let currentSecond = currentDate.getSeconds();

    console.log(currentSecond)
    // currentSecond就是当前的秒数，你可以随意调整到你喜欢的变化范围

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


let notePattern = [71, 62, 57, 64, 45, 56, 67, 48, 59, 50];