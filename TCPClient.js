var net = require('net');
var port = 4001;
var quitting = false;
var conn;
var retryTimeout = 3000;

var retriedTimes = 0;
var maxRetries = 10;

process.stdin.resume();

process.stdin.on("data", function( data ) {
	if (data.toString().trim().toLowerCase() === "quit") {
		quitting = true;
		console.log("Quitting...");
		conn.end();
		process.stdin.pause();
	} else {
		conn.write(data);
	}
});

(function connect() {
	function reconnect() {
		if (retriedTimes >= maxTries) {
			throw new Error('Max tried exceeded, giving up.');
		}
		retriedTimes += 1;
		setTimeout(connect, retryTimeout);
	}

	conn = net.createConnection(port);

	conn.on('connect', function() {
		retriedTimes = 0;
		console.log('Connected to server');
	});

	conn.on('error', function( err ) {
		console.log('Error in connection: ', err);
	});

	conn.on('close', function() {
		if (! quitting) {
			console.log('Attempting to reconnect to server.');
			reconnect();
		}
	});

	conn.pipe(process.stdout, {end: false});

}());