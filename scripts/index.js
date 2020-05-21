let string = '';
let buttons = document.querySelectorAll('.visi-but');
let ans = '';

// basic arithmetic functions - each takes user input and returns a single number
function add(numArray) {
	numArray = numArray.map(Number);
	return numArray.reduce(function (acc, cur) {
		return acc + cur;
	})
}

function subtract(numArray) {
	numArray = numArray.map(Number);
	return numArray.reduce(function (acc, cur) {
		return acc - cur;
	})
}


function multiply(numArray) {
	numArray = numArray.map(Number);
	return numArray.reduce(function (acc, cur) {
		return acc * cur;
	})
}

function divide(numArray) {
	numArray = numArray.map(Number);
	return numArray.reduce(function (acc, cur) {
		return acc / cur;
	})
}

// function that takes an array of numbers and calls one of the arithmetic functions
function operate(operator, numArray) {
	if (operator == '+') {
		return add(numArray);
	} else if (operator == '-') {
		return subtract(numArray);
	} else if (operator == '*') {
		return multiply(numArray);
	} else if (operator == '/') {
		return divide(numArray);
	} else return;
}


// function that breaks up a string into an array on spaces 
function breakUp(string) {
	return string.split(" ");
}

// function to loop through an array of strings and find and evaluate expressions following pemdas
function evalToo(string) {
	strArray = breakUp(string);

	while (strArray.indexOf('*') > -1) {
		strArray.splice(strArray.indexOf('*') - 1, 3,
			operate('*', [strArray[strArray.indexOf('*') - 1], strArray[strArray.indexOf('*') + 1]]))
	}
	while (strArray.indexOf('/') > -1) {
		strArray.splice(strArray.indexOf('/') - 1, 3,
			operate('/', [strArray[strArray.indexOf('/') - 1], strArray[strArray.indexOf('/') + 1]]))
	}
	while (strArray.indexOf('+') > -1) {
		strArray.splice(strArray.indexOf('+') - 1, 3,
			operate('+', [strArray[strArray.indexOf('+') - 1], strArray[strArray.indexOf('+') + 1]]))
	}
	while (strArray.indexOf('-') > -1) {
		strArray.splice(strArray.indexOf('-') - 1, 3,
			operate('-', [strArray[strArray.indexOf('-') - 1], strArray[strArray.indexOf('-') + 1]]))
	}

	return strArray[0];
}

// function for deleting last entry
function delLast() {
	if (string.length > 1) {
		if (string[string.length - 1] == ' ') {
			string = string.substring(0, string.length - 3);
			updateDisplay();
		} else {
			string = string.substring(0, string.length - 1);
			updateDisplay();
		}
	} else {
		string = '0';
		updateDisplay();
		string = '';
	}
}

// function for updating the display with the current number
function updateDisplay() {
	document.getElementById("current").innerHTML = string;
}

// function that updates the history when equals pressed
function updateHistory() {
	if (string.length == 0) {
		string = '0';
	}
	document.getElementById('history').innerHTML = string + ' =';
	document.getElementById('current').innerHTML = evalToo(string);
	ans = evalToo(string);
	string = evalToo(string);

}

// function to reset display when clear is pressed
function resetDisplay() {
	if (string.length == 0) {
		string = '0';
	}
	document.getElementById('history').innerHTML = 'ans = ' + ans;
	string = '0';
	updateDisplay();
	string = '';

}

// event listener for retrieving user input and displaying it on screen
buttons.forEach(button => {
	button.addEventListener('click', function () {
		string += button.value;
		updateDisplay();
	});
})

// event listener for clearing the display
document.getElementById('clear').addEventListener('click', resetDisplay)

// event listener for delete button - removes last button entry
document.getElementById('delete').addEventListener('click', delLast)

// event listener that updates history when equals is clicked
document.getElementById('equals').addEventListener('click', updateHistory)