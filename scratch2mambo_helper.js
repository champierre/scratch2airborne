var RollingSpider = require("rolling-spider");
var ACTIVE = true;
var d = new RollingSpider({uuid:"f14b51c41e6849419fc1e6b13e0e3e58"}); // mambo

var WebSocketServer = require('ws').Server;
const PORT = 8888;
var wss = new WebSocketServer({port: PORT});
var connections = [];

function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, 10);
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
    if (data.command == 'take_off') {
      d.takeOff();
    } else if (data.command == 'land') {
      d.land();
    } else if (data.command == 'forward') {
      d.forward({ speed: data.speed, steps: data.steps }); cooldown();
    } else if (data.command == 'backward') {
      d.backward({ speed: data.speed, steps: data.steps }); cooldown();
    } else if (data.command == 'turn_right') {
      d.turnRight({ speed: data.speed, steps: data.steps }); cooldown();
    } else if (data.command == 'turn_left') {
      d.turnLeft({ speed: data.speed, steps: data.steps }); cooldown();
    } else if (data.command == 'up') {
      d.up({ speed: data.speed, steps: data.steps }); cooldown();
    } else if (data.command == 'down') {
      d.down({ speed: data.speed, steps: data.steps }); cooldown();
    } else if (data.command == 'drive') {
      d.drive({ tilt: data.tilt, forward: data.forward, turn: data.turn, up: data.up }, data.steps); cooldown();
    } else if (data.command == 'front_flip') {
      d.frontFlip(); cooldown();
    }
  });
});
