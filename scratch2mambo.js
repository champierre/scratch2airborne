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
      ws = new WebSocket('ws://localhost:8080');
      console.log('Connected')
    }

    ext.take_off = function() {
      if (ws) {
        ws.send(JSON.stringify({command: 'drone_take_off'}));
      }
    }

    ext.land = function() {
      if (ws) {
        ws.send(JSON.stringify({command: 'drone_land'}));
      }
    }

    ext.forward = function(steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'drone_forward', steps: steps}));
      }
    };

    ext.backward = function(steps) {
      if (ws) {
        ws.send(JSON.stringify({command: 'drone_backward', steps: steps}));
      }
    }

    ext.right = function(degrees) {
      if (ws) {
        ws.send(JSON.stringify({command: 'drone_right', degrees: degrees}));
      }
    };

    ext.left = function(degrees) {
      if (ws) {
        ws.send(JSON.stringify({command: 'drone_left', degrees: degrees}));
      }
    }

    ext.flip = function(degrees) {
      if (ws) {
        ws.send(JSON.stringify({command: 'drone_flip'}));
      }
    }

    var lang = ((navigator.language || navigator.userLanguage) == 'ja') ? 'ja' : 'en';
    var locale = {
        ja: {
            connect: '接続する',
            take_off: '離陸',
            land: '着陸',
            turn_right: '右に %n 度回す',
            turn_left: '左に %n 度回す',
            move_forward: '%n 歩前進させる',
            move_backward: '%n 歩後退させる',
            flip: '宙返り'
        },
        en: {
            connect: 'connect',
            take_off: 'take off',
            land: 'land',
            turn_right: 'turn right %n degrees',
            turn_left: 'turn left %n degrees',
            move_forward: 'move forward %n steps',
            move_backward: 'move backward %n steps',
            flip: 'flip'
        },
    }

    var descriptor = {
        blocks: [
            [' ', 'Drone: ' + locale[lang].connect, 'connect'],
            [' ', 'Drone: ' + locale[lang].take_off, 'take_off'],
            [' ', 'Drone: ' + locale[lang].land, 'land'],
            [' ', 'Drone: ' + locale[lang].turn_right, 'right', 90],
            [' ', 'Drone: ' + locale[lang].turn_left, 'left', 90],
            [' ', 'Drone: ' + locale[lang].move_forward, 'forward'],
            [' ', 'Drone: ' + locale[lang].move_backward, 'backward'],
            [' ', 'Drone: ' + locale[lang].flip, 'flip']
        ]
    };

    ScratchExtensions.register('Scratch2Mambo', descriptor, ext);
})({});
