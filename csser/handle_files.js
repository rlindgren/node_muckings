var fs = require('fs'),
		extname = require('path').extname,

		dir_contents = [],
		files = [],

		red   = '\033[31m',
		blue  = '\033[34m',
		reset = '\033[0m';
// See more at: http://roguejs.com/2011-11-30/console-colors-in-node-js/#sthash.PpqdWqui.dpuf

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