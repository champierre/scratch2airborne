(function(ext) {
    var ws;
    var when_near = false;
    var when_far = false;
    var when_clear = false;
    var radar = '';

    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.connect = function() {
      ws = new WebSocket('ws://localhost:8888');
      console.log('Connected')
    }

    ext.take_off = function() {
      if (ws) {
        ws.send(JSON.stringify({command: 'take_off'}));
      }
    }

    ext.land = function() {
      if (ws) {
        ws.send(JSON.stringify({command: 'land'}));
      }
    }

    ext.forward = function(speed, steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'forward', speed: speed, steps: steps}));
      }
    };

    ext.backward = function(speed, steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'backward', speed: speed, steps: steps}));
      }
    }

    ext.turn_right = function(speed, steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'turn_right', speed: speed, steps: steps}));
      }
    };

    ext.turn_left = function(speed, steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'turn_left', speed: speed, steps: steps}));
      }
    }

    ext.up = function(speed, steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'up', speed: speed, steps: steps}));
      }
    };

    ext.down = function(speed, steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'down', speed: speed, steps: steps}));
      }
    }

    ext.drive = function(tilt, forward, turn, up, steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'drive', tilt: tilt, forward: forward, turn: turn, up: up, steps: steps}));
      }
    }

    ext.front_flip = function() {
      if (ws) {
        ws.send(JSON.stringify({command: 'front_flip'}));
      }
    }

    var lang = ((navigator.language || navigator.userLanguage) == 'ja') ? 'ja' : 'en';
    var locale = {
        ja: {
            connect: '接続する',
            take_off: '離陸',
            land: '着陸',
            forward: '前進(スピード: %n、長さ: %n)',
            backward: '後退(スピード: %n、長さ: %n)',
            turn_right: '右旋回(スピード: %n、長さ: %n)',
            turn_left: '左旋回(スピード: %n、長さ: %n)',
            up: '上昇(スピード: %n、長さ: %n)',
            down: '下降(スピード: %n、長さ: %n)',
            drive: 'drive(tilt: %n, forward: %n, turn: %n, up: %n, steps: %n)',
            front_flip: '前方宙返り'
        },
        en: {
            connect: 'connect',
            take_off: 'take off',
            land: 'land',
            forward: 'forward(speed: %n, steps: %n)',
            backward: 'backward(speed: %n, steps: %n)',
            turn_right: 'turn right(speed: %n, steps: %n)',
            turn_left: 'turn left(speed: %n, steps: %n)',
            up: 'up(speed: %n, steps: %n)',
            down: 'down(speed: %n, steps: %n)',
            drive: 'drive(tilt: %n, forward: %n, turn: %n, up: %n, steps: %n)',
            front_flip: 'front flip'
        },
    }

    var descriptor = {
        blocks: [
            [' ', 'Drone: ' + locale[lang].connect, 'connect'],
            [' ', 'Drone: ' + locale[lang].take_off, 'take_off'],
            [' ', 'Drone: ' + locale[lang].land, 'land'],
            [' ', 'Drone: ' + locale[lang].forward, 'forward', 50, 10],
            [' ', 'Drone: ' + locale[lang].backward, 'backward', 50, 10],
            [' ', 'Drone: ' + locale[lang].turn_right, 'turn_right', 50, 10],
            [' ', 'Drone: ' + locale[lang].turn_left, 'turn_left', 50, 10],
            [' ', 'Drone: ' + locale[lang].up, 'up', 50, 10],
            [' ', 'Drone: ' + locale[lang].down, 'down', 50, 10],
            [' ', 'Drone: ' + locale[lang].drive, 'drive', 0, 50, 0, 0, 10],
            [' ', 'Drone: ' + locale[lang].front_flip, 'front_flip']
        ]
    };

    ScratchExtensions.register('Scratch2Mambo', descriptor, ext);
})({});
