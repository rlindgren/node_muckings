// the program reads the contents of my css or scss files (given a path),
// and produces a list of all selectors defined therein in a new file, 
// whose name is declared as the second parameter (both strings).

var fs = require('fs');
var util = require('util');
var child_process = require('child_process');
var path = require('path');
var cla = require('./cla');
var get_files = require('./get_files');

var dir_contents;
var css_files = [];

var re_patterns = {};
re_patterns.selectors = /^((.*)\{.*\})+/;  // could/should build a separate module

var args = process.argv;
cla.handle_cla(args);				// handle command line args

console.log(args, get_files.files);

get_files.get_files(args.path);		// args object contains necessary data to verify path

console.log(get_files.files);