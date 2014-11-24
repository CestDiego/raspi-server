var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 });

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('I amm alive')
wss.on('connection', function connection(ws) {
    console.log('user has connected');
    ws.on('message', function incoming(message) {
        rl.setPrompt('OHAI> ');
        rl.prompt();
        rl.on('line', function(line) {
            switch(line.trim()) {
                case 'on':
                    console.log('world!');

                    if (message =="true"){
                        console.log("Sorry Lamp is currentrly On");
                    }
                    else if (message == "false"){
                        ws.send("lampOn");
                        console.log("And there was the light!");
                    }
                break;
                case 'off':
                    if (message =="true"){
                        ws.send("lampOff");
                        console.log("The darkness got into you");
                    }
                    else if (message == "false"){
                        console.log("Darkness is in this kingdomalready");
                    }
                break;
                default:
                    console.log('Say what? I might have heard `' + line.trim() + '`');
                break;
            }
            rl.prompt();
        }).on('close', function() {
            console.log('Have a great day!');
            process.exit(0);
        });
    });
});
