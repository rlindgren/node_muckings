// the program reads the contents of my css or scss files (given a path),
// and produces a list of all selectors defined therein in a new file, 
// whose name is declared as the second parameter (both strings).

var cla = require('./handle_cla'),
		hf = require('./handle_files'),
		re = require('./re_patterns'),

		args = process.argv;

cla.handle_cla(args);		// handle command line args

hf.prep_files(args.path);		// prep files for reading

