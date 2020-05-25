let string = '';
let buttons = document.querySelectorAll('.visi-but');
let ans = '';
let operations = ['/', '*', '+', '-'];
let rawans=0;

// simple rounding function
function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// basic arithmetic functions - each takes user input and returns a single number


function add(numArray) {
	numArray = numArray.map(Number);
	return round(numArray.reduce(function (acc, cur) {
		return acc + cur;
	}), 8)
}

function subtract(numArray) {
	numArray = numArray.map(Number);
	return round(numArray.reduce(function (acc, cur) {
		return acc - cur;
	}), 8)
}


function multiply(numArray) {
	numArray = numArray.map(Number);
	return round(numArray.reduce(function (acc, cur) {
		return acc * cur;
	}), 8)
}

function divide(numArray) {
	numArray = numArray.map(Number);
	return round(numArray.reduce(function (acc, cur) {
		return acc / cur;
	}), 8)
}

// function that takes an array of numbers and calls one of the arithmetic functions
function operate(operator, numArray) {
	if (operator == '+') {
		return round(add(numArray), 6);
	} else if (operator == '-') {
		return round(subtract(numArray), 6);
	} else if (operator == '*') {
		return round(multiply(numArray), 6);
	} else if (operator == '/') {
		return round(divide(numArray), 6);
	} else return;
}


// function that breaks up a string into an array on spaces 
function breakUp(string) {
	return string.split(" ");
}


// function to loop through an array of strings and find and evaluate expressions following pemdas
function evalToo(strArray) {


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

	return strArray;

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

/* function that checks for unclosed parentheticals and adds closing parentheses to the 
end of the expression if any hanging opens are identified and adds open parens to 
beginning of expression if hanging closeds are identified */
function closeThoseParens(badString) {
	let openTicker = 0;
	let closedTicker = 0;
	for (let i = 0; i < badString.length; i++) {
		if (badString[i] === '(') {
			openTicker++;
		} else if (badString[i] === ')') {
			closedTicker++;
		}
	}
	while (openTicker > closedTicker) {
		badString += " ) "
		closedTicker++;
	}

	string = badString;
}



// function that updates the history when equals pressed
function updateHistory() {

	// first check that user hasn't ended on an operator - return function if so
	let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	let operators = ['+', '-', '*', '/'];
	let numIndexes = [];
	let opIndexes = [];

	numbers.forEach(function (item) {
		numIndexes.push(string.lastIndexOf(item))

	})

	operators.forEach(function (item) {
		opIndexes.push(string.lastIndexOf(item))

	})

	if (Math.max(...numIndexes) < Math.max(...opIndexes)) {
		return
	}

	// check that user isn't trying to submit a single decimal point
	if (string == '.') {
		return
	}

	// check that we aren't trying to submit a single open parenthesis
	if (string == ' ( ') {
		return;
	}

	// next ensure that all open parentheses are closed

	closeThoseParens(string);

	console.log(string)
	// next ensure that the beginning and end of the string aren't spaces
	if (string[0] == ' ') {
		string = string.slice(1, string.length)
	}

	if (string[string.length - 1] == ' ') {
		string = string.slice(0, string.length - 1);
	}

	if (string.length == 0) {
		string = '0';
	}
	console.log(string)
	// next break up string into an array with space delimiters
	strArray = breakUp(string);
	console.log(strArray)
	// next mmodify the display to show the answer to the expression
	document.getElementById('history').innerHTML = string + ' =';
	document.getElementById('current').innerHTML = jujubean(strArray);
	

	ans = jujubean(strArray).toString();
	string = jujubean(strArray).toString();

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

// function to get user input and turn it into an expression
function getInput(value) {
// catches 'x' input for multiplication
if (value == 'x') {
	value = '*'
}

	// ensures that a closed paren can't be input without an open paren
	let openCount = 0;
	let closedCount = 0;
	for (let i = 0; i < string.length; i++) {
		if (string[i] == '(') {
			openCount++;
		} else if (string[i] == ')') {
			closedCount++;
		}
	}

	if (value == ')' && (closedCount >= openCount || string[string.length - 2] == '(')) {
		return
	}

	// ensures that users cannot type multiple decimals into the same number e.g. 1.2.3.
	let periodIndex = 0;
	let spaceIndex = 0;

	if (value == '.' ) {
		periodIndex = string.lastIndexOf('.');
		spaceIndex = string.lastIndexOf(' ');
		if (periodIndex > spaceIndex) {
			return
		}
		
	}

	// ensures that two periods can't be inut at beginning of string
	if (value == '.' && string[string.length - 1] == '.') {
		return;
	}



	if (['+', '-', '*', '/', '(', ')'].includes(value)) {
		if (value == '-') {
			if (string.length == 0 || ['+', '*', '/', '('].includes(string[string.length - 2])) {
				string = string + value;
			} else if (string[string.length - 1] == '.') {
				if (string.length == 1 || string[string.length - 2] == ' ') {
					return
				}
			} else if (string[string.length - 2] == '-' && string[string.length - 1] == ' ') {
				return;
			} else if (string[string.length - 1] == ' ') {
				string = string + value + ' ';
			} else {
				string = string + ' ' + value + ' ';
			}
		} else if (string[string.length - 1] == '.') {
			if (string.length == 1 || string[string.length - 2] == ' ') {
				return
			}
		} else if (['*', '/', '+', ')'].includes(value)) {
			if (['*', '/', '+'].includes(value) && string[string.length - 2] == '-' && string[string.length - 1] == ' ') {
				return;
			} else if (['*', '/', '+'].includes(value) && ['*', '/', '+'].includes(string[string.length - 2])) {
				return
			} else if (['*', '/', '+'].includes(value) && string.length == 0) {
				return;
			} else if (string[string.length - 1] == ' ') {
				string = string + value + ' ';
			} else {
				string = string + ' ' + value + ' ';
			}
		} else if (value == '(') {
			if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(string[string.length - 1])) {
				string = string + ' ' + '*' + ' ' + value + ' ';
			} else if (string[string.length - 1] == ' ') {
				string = string + value + ' ';
			} else {
				string = string + ' ' + value + ' ';
			}
		}


	} else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(value) && string[string.length - 2] == ')') {
		string = string + '*' + ' ' + value;
	} else string += value;

	updateDisplay();
}

// function that makes parnetheses work in order of operations 
function jujubean(stringArray) {
	for (let i = stringArray.length - 1; i >= 0; i--) {
		if (stringArray[i] == '(') {
			for (let j = i; j <= stringArray.length - 1; j++) {
				if (stringArray[j] == ')') {
					stringArray.splice(i, j - i + 1, evalToo(stringArray.slice(i + 1, j))[0].toString())
					break;
				}

			}
		}
	}


	return evalToo(stringArray)[0];

}

// event listener for retrieving user input and displaying it on screen
buttons.forEach(button => {
	button.addEventListener('click', function () {
		let value = button.value;
		getInput(value);

	});
})

// event listener for getting keyboard input 
document.addEventListener('keydown', function (pressed) {
	if ('1234567890-*x/+().'.includes(pressed.key)) {
		let value = pressed.key;
		getInput(value);
	}

	// pressing c clears display
	if (pressed.keyCode === 67) {
		resetDisplay();
	}

	// pressing delete key deletes last
	if (pressed.keyCode === 8) {
		delLast();
	}

	// pressing return/enter key sets equals
	if (pressed.keyCode === 13 || pressed.key === '=') {
		updateHistory();
	}

})

// event listener for clearing the display by clicking AC
document.getElementById('clear').addEventListener('click', resetDisplay)


// event listener for delete button - removes last button entry
document.getElementById('delete').addEventListener('click', delLast)


// event listener that updates history when equals is clicked
document.getElementById('equals').addEventListener('click', updateHistory)

