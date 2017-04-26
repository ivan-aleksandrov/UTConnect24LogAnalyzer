var fs = require('fs');
var readline = require('readline');
var arrayOne = [];
// file = name of the log file to be analyzed
var file = 'server.log.2017-04-26';

var rl = readline.createInterface({
	input: fs.createReadStream(file),
	output: process.stdout,
	terminal: false
});

rl.on('line', function (line) {
	try {
		var temp = line.split('method":')[1].split(',')[0].trim();
		// temp = used method in the JSON request
		arrayOne.push(temp);
		// fill arrayOne with all methods
	}
	catch (err) { }
});

rl.on('close', function () {
	// sort arrayOne 'a,a,b,c,c,c,d,d,e...etc' and count repetitions.
	arrayOne.sort();
	var current = null;
	var cnt = 0;
	console.log(file);
	for (var i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] != current) {
			if (cnt > 0) {
				console.log(current + ' comes --> ' + cnt + ' times');
			}
			current = arrayOne[i];
			cnt = 1;
		} else {
			cnt++;
		}
	}
	if (cnt > 0) {
		console.log(current + ' comes --> ' + cnt + ' times');
	}
});

// example output:
// server.log.2017-04-25
// "DICT" comes --> 14 times
// "GET_RECORD" comes --> 538 times
// "OFS" comes --> 1070 times
// "SAVE_RECORD" comes --> 3819 times
// "SELECT" comes --> 2341 times
// "SIGN_ON" comes --> 1 times
// "VALIDATE_RECORD" comes --> 9793 times