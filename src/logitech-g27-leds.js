const wheel = require('logitech-g27');
wheel.connect()

function runLED() {
  console.log(`RPM Percent: ${global.rpm_percent}`)
  wheel.leds(global.rpm_percent)
}

module.exports = { runLED };