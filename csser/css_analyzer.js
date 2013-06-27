// the program reads the contents of my css or scss files (given a path),
// and produces a list of all selectors defined therein in a new file, 
// whose name is declared as the second parameter (both strings).

var fs = require('fs');
var util = require('util');
var child_process = require('child_process');
var path = require('path');
var cla = require('./cla');
var gf = require('./get_files');

var dir_contents;
var css_files = [];

var re_patterns = {};
re_patterns.selectors = /^((.*)\{.*\})+/;  // could/should build a separate module

var args = process.argv;  // handle command line args
cla.handle_cla(args);

gf.get_files(args.path);

console.log(args.path);

console.log(args, gf.files);		// testing