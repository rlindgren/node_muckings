var querystring = require("querystring");
var fs = require("fs");
var formidable = require('formidable');
var util = require("util");

function requestLog() {
	console.log("Request handler '" + requestLog.caller.name + "' was called.");
}

function index( response, request ) {
	requestLog();
	
	var body = '<html>' + '<head>' + '<meta http-equiv="Content-Type" content="text.html; ' +
	'charset=UTF-8" />' + '</head>' + '<body>' + '<form action="/upload" endtype="multipart/form-data" method="post">' +
	'<input type="file" name="upload" multiple="multiple">' +
	'<input type="submit" value="Upload file" />' + '</form>' + '</body>' + '</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload( response, request ) {
	requestLog();

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function( error, fields, files ) {
		console.log("parsing complete");
		console.log(fields); console.log(error); console.log(files);
		fs.rename("./tmp/" + fields.upload, "./tmp/test.png", function( err ) {
			if (err) {
				fs.unlink("./tmp/test.png");
				fs.rename(files.upload.path, "./tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:</br>");
		response.write("<img src='/show' />")
		response.end(util.inspect({fields: fields, files: files}));
	});
}

function show( response, request ) {
	requestLog();
	fs.readFile("./tmp/test.png", "binary", function( err, file ) {
		if (err) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(err + "\n");
			response.end()
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end()
		}
	});
	
}

function start( response, request ) {
	requestLog();
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Heller, Starter!");
	response.end()
}

exports.index = index;
exports.show = show;
exports.start = start;
exports.upload = upload;