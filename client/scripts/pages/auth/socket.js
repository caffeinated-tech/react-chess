
module.exports = function(sessionID){
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  const socket = new WebSocket('ws://localhost:3000');
  socket.onopen = function open() {
    let message = JSON.stringify({
      type: 'move', 
      payload: {from: 'awd'}});
    socket.send(message);
  }

  socket.onmessage = function incoming(data) {
    console.log("from socket", data);
    setTimeout(function(){socket.send('message');},1000);
  }

  if(window != undefined){
    window.socket = socket;
  }
}