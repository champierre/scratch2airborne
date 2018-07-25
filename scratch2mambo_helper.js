var RollingSpider = require("rolling-spider");
var ACTIVE = true;
var STEPS = 10;
var d = new RollingSpider({uuid:"f14b51c41e6849419fc1e6b13e0e3e58"}); // mambo

var WebSocketServer = require('ws').Server;
const PORT = 8888;
var wss = new WebSocketServer({port: PORT});
var connections = [];

function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS);
}

d.connect(function () {
  d.setup(function () {
    console.log('Configured for Mambo! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    setTimeout(function () {
      console.log(d.name + ' => SESSION START');
      ACTIVE = true;
    }, 1000);
  });
});

wss.on('connection', function(ws) {
  console.log('Connected');
  connections.push(ws);
  ws.on('close', function() {
    connections = connections.filter(function (conn, i) {
      return (conn === ws) ? false : true;
    });
  });
  ws.on('message', function(json) {
    console.log("received " + json);
    data = JSON.parse(json);
    var param = {tilt:0, forward:0, turn:0, up:0};
    if (data.command == 'drone_take_off') {
      d.takeOff();
    } else if (data.command == 'drone_land') {
      d.land();
    } else if (data.command == 'drone_forward') {
      d.forward({ steps: STEPS }); cooldown();
    } else if (data.command == 'drone_backward') {
      d.backward({ steps: STEPS }); cooldown();
    } else if (data.command == 'drone_right') {
      param.turn = 90; d.drive(param, STEPS); cooldown();
    } else if (data.command == 'drone_left') {
      param.turn = -90; d.drive(param, STEPS); cooldown();
    } else if (data.command == 'drone_flip') {
      d.frontFlip(); cooldown();
    }
  });
});
