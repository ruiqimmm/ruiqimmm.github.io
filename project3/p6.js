// Run this example on a mobile device
// Shake the device to change the value.

let value = 0;
function draw() {
    fill(value);
    rect(25, 25, 50, 50);
    describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when device shakes`);
}
function deviceShaken() {
    value = value + 5;
    if (value > 255) {
        value = 0;
    }
}