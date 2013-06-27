var fs = require('fs'),
	extname = require('path').extname,

	dir_contents = [];

function verify_path (path) {
	return fs.existsSync(path);
}

function read_dir (path) {
	fs.readdirSync(path).forEach(function (file) {
		if (file.search(/^\./) === 0) { }
		else if (! fs.statSync(path + file).isDirectory()) {
			dir_contents.push(file);
		} else {
			read_dir(path + file + '/');
		}
	});
}

exports.prep_files = read_dir;
exports.files = dir_contents;