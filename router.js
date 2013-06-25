function route( handle, pathname, response, request ) {
	console.log("Routing a request for " + pathname);
	if ( typeof handle[pathname] === 'function' )  {
		handle[pathname](response, request);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write("404 Error - Not Found");
		response.end();
	}
}

exports.route = route;