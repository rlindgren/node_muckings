var normalize = require('path').normalize;

exports.handle_cla = function (args) {
	if (args.length >= 4) {
		if (args.length === 5) {
			args.flags = args[2];
			args.path = args[3];
			args.output_file = normalize(normalize(args.path) + "/" + args[4]);
		} else {
			args.path = args[2];
			args.output_file = normalize(normalize(args.path) + "/" + args[3]);
		}
	} else if (args.length === 3) {
		args.path = args[2];
		args.output_file = normalize(normalize(args.path) + "/css_selector_list.txt");
	} else {
		console.log('Please enter the directory or file path (relative to "env.HOME") as the search path.');
	}
}