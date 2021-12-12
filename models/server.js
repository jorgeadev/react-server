const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require("./sockets");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
		// Http server
		this.server = http.createServer(this.app);
		// Sockets config
		this.io = socketIo(this.server, { /* configs */ });
	};

	socketsConfig() {
		new Sockets(this.io);
	};

	middlewares() {
		this.app.use(express.static(path.resolve(__dirname, '../public')));
	};

	execute() {
		// Start middlewares
		this.middlewares();
		// Start sockets config
		this.socketsConfig();
		// Start server
		this.server.listen(this.port, () => {
			console.log('Server listening on port ', this.port);
		});
	};
}

module.exports = Server;
