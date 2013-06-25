var fs = require('fs');
var extname = require('path').extname;

var files = [];

function verify_path (path) {
	return fs.existsSync(path);
}

function get_files (path) {
	var dir_contents;
	if (verify_path(path)) {
		if (fs.statSync(path).isDirectory()) {
			dir_contents = fs.readdirSync(path);
			dir_contents.forEach(function (file) {
				if (extname(file).search(/(.css|.scss|.sass)/) >= 0) {
					files.push(file);
				} else {
					get_files(file);
				}
			});
		} else { 
			files.push(path) 
		}
	} else {
		throw new Error("Invalid path.");
	}
}

exports.get_files = get_files;
exports.files = files;