const dgram = require('node:dgram');
const forza = require('./forza-horizon-5-telemetry.js');
const wheel = require('./logitech-g27-leds.js');

const server = dgram.createSocket('udp4');
global.rpm_percent = 0

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, info) => {// eslint-disable-line no-unused-vars
  let rpm = forza.parseTelemetry(msg.toJSON().data)
  global.rpm_percent = rpm.percent
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

setInterval(wheel.runLED, 50);
server.bind(5192);