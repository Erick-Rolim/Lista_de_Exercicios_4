const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', ws => {
  setInterval(() => {
    const data = {
      sync: Math.random() * 100,
      units: Math.floor(Math.random() * 5 + 1),
      power: (Math.random() * 2000).toFixed(2),
      alarms: Math.random() > 0.85 ? 1 : 0
    };
    ws.send(JSON.stringify(data));
  }, 1000);
});
