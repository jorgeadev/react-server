class Sockets {
	constructor(io) {
		this.io = io;
		this.socketEvents();
	}

	socketEvents() {
		// Socket server config
		this.io.on('connection', (socket) => {
			console.log('Socket Id: ', socket.id);
			// Event listener: message-to-server
			socket.on('message-to-server', (data) => {
				console.log(data);
				this.io.emit('message-to-client', data);
			});
		});
	}
}

module.exports = Sockets;
