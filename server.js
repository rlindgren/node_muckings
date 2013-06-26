var http = require('http');
var url = require('url');

function start( route, handle ) {
	function onRequest( req, res ) {
		var pathname = url.parse(req.url).pathname;
		if ( pathname.search(/^\/favicon/) === -1 ) {				// dont process favicon requests
			console.log('Request for ' + pathname + ' received');
			route(handle, pathname, res, req);
		}
	}

	http.createServer(onRequest).listen(8000);
	console.log("Server has started.");
}

exports.start = start;

if (require.main === module) start();