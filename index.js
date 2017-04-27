var fs = require('fs');
var readline = require('readline');
var arrayOne = [];
var arrayApps = [];
var combinedArr = [];
// file = name of the log file to be analyzed
var file = 'server.log.2017-04-25';

var rl = readline.createInterface({
	input: fs.createReadStream(file),
	output: process.stdout,
	terminal: false
});

rl.on('line', function (line) {
	try {
		// temp = used method in the JSON request
		var temp = line.split('method":')[1].split(',')[0].trim();
		// fill arrayOne with all methods
		arrayOne.push(temp);		
		try {
			var tempApps = line.split('application":')[1].split(/,|}/)[0].trim();
		}
		catch (err) {
			// tempApps = used application in the JSON request
			var tempApps = '"NO_APPLICATION"'
		}
		arrayApps.push(tempApps);
		// fill arrayApps with all methods
	}
	catch (err) { }
});

rl.on('close', function () {
	for (var i = 0; i < arrayApps.length; i++) {
		combinedArr[i] = [arrayOne[i], arrayApps[i], 1];
	}
	combinedArr.sort(sortFunction);

	function sortFunction(a, b) {
		if (a[0] === b[0]) {
			return 0;
		}
		else {
			return (a[0] < b[0]) ? -1 : 1;
		}
	}
	//Evaluate each element of the combinedArr with preceding. It stops if it finds match. The matched preceding element gets ++ on its counter, and the evaluated element gets its counter=0
	for (var i = 1; i < combinedArr.length; i++) {
		for (var j = 0; j < i; j++) {
			if (combinedArr[j][0] == combinedArr[i][0] && combinedArr[j][1] == combinedArr[i][1]) {
				combinedArr[j][2]++;
				combinedArr[i][2] = 0;
				break;
			}
		}
	}
	var tempCount = 0;
	console.log(file);
	for (var i = 0; i < combinedArr.length; i++) {
		if (combinedArr[i][2] != 0) {
			console.log('Method: ' + combinedArr[i][0] + ' Application: ' + combinedArr[i][1] + ' --> ' + combinedArr[i][2] + ' times.');
			tempCount+=combinedArr[i][2];
		}

	}
	console.log('Total requests: '+tempCount);
});