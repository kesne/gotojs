/*
	gotojs
	======

	A delightfully evil abomination of eval() with goto(); all in global space
	by Dave Balmer.

	See the README.md for more info.
*/

// start execution
function run(l) {
	linenumber = [];

	// object properties are not returned in order
	for (var k in program)
		linenumber.push(k * 1);

	// so we sort them out
	linenumber = linenumber.sort(function(a, b) {
		if (a > b)
			return 1;
		else if (a < b)
			return -1;
		else
			return 0;
	});

	// prevent runaway scripts
	var max = 0;

	line = -1;
	if (l)
		goto(l);
	else
		line = 0;

	// execution engine, powered by globals and eval()
	for (; line < linenumber.length; line++) {
		if (debug)
			console.log(linenumber[line] + " " + program[linenumber[line]]);

		// no more than 10000 lines executed; who needs more than that, really?
		if (++max > 10000)
			return;

		// eval() is eval
		eval(program[linenumber[line]]);
	}
}

// load a .gotojs file and assign it to program
function load(f) {
	console.log('loading program...');
	var xhr = new XMLHttpRequest();
	xhr.open("GET", f, false);
	xhr.send(null);
	program = {};
	if (xhr.status === 200) {
		if (debug)
			console.log(xhr.responseText);
			
		var programlines = xhr.responseText.split("\n");
		
		// TODO: fix up the auto-line mechanism to work better when users occasionally define lines. Would probably be best to save the last line number and then increment from that point, allowing for more casual line declarations. 
		
		// line label extractor:
		var r = /[0-9]*:/;
		for (var i = 0; i < programlines.length; i++) {
			var autoline = (1 + i) * 10;
			if(program[autoline]){
				// offset by one if you've manually defined it previously
				autoline++;
			}
			
			var l = programlines[i];
			
			// custom line labels:
			var labels = r.exec(l);
			if(labels && l.replace(' ', '').indexOf(labels[0]) === 0){
				autoline = parseInt(labels[0], 10);
				l = l.substring(labels[0].length);
			}
			program[autoline] = l;
		}
	}else{
		if (debug)
			console.log('Error loading.');
	}
}

// dumping things to the DOM; couldn't bring myself to use document.write()
function print(s) {
	var o = document.createElement("p");
	o.innerHTML = s;
	document.body.appendChild(o);
}

debug = 0;

// turn debugging on
function tron() {
	debug = true;
}

// turn it off
function troff() {
	debug = false;
}

// move execution to another line number
function goto(l) {
	var test = linenumber.indexOf(l);

	if (test >= 0)
		line = (line >= 0) ? test - 1 : test;
}

// stop execution
function end() {
	line = linenumber.length;
}

