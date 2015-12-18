var RollingSpider = require("rolling-spider");
var net = require('net');
var ACTIVE = true;
var STEPS = 10;
var SCRATCH_PORT = 42001;
var d = new RollingSpider({uuid:"31ccecc12ce242b0bcbe72070ed2bc18"});

function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS);
}

d.connect(function () {

  d.setup(function () {
    console.log('Configured for Airborne! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    setTimeout(function () {
      console.log(d.name + ' => SESSION START');
      ACTIVE = true;
    }, 1000);

  });
});

var client = new net.Socket();
client.connect(SCRATCH_PORT, '127.0.0.1', function() {
	console.log('Connected');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
  if (String(data).match(/broadcast "(.*)"/) !== null) {
    var action = RegExp.$1;
    var param = {tilt:0, forward:0, turn:0, up:0};
    switch (action) {
      case 'takeoff': console.log('TAKEOFF'); d.takeOff(); break;
      case 'land': console.log('LAND'); d.land(); break;
      case 'forward': console.log('FORWARD'); d.forward({ steps: STEPS }); cooldown(); break;
      case 'backward': console.log('BACKWARD'); d.backward({ steps: STEPS }); cooldown(); break;
      case 'hover': console.log('HOVER'); d.hover(); break;
      case 'right': console.log('RIGHT'); param.turn = 90; d.drive(param, STEPS); cooldown(); break;
      case 'left': console.log('LEFT'); param.turn = -90; d.drive(param, STEPS); cooldown(); break;
      case 'flip': console.log('FLIP'); d.frontFlip(); cooldown(); break;
      case 'backflip': console.log('BACKFLIP'); d.backFlip(); cooldown(); break;
      case 'up': console.log('UP'); d.up({ steps: STEPS }); cooldown(); break;
      case 'down': console.log('DOWN'); d.down({ steps: STEPS }); cooldown(); break;
      default : console.log('other'); break;
    }
  }
});

client.on('close', function() {
	console.log('Connection closed');
});
