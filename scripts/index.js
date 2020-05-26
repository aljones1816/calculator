let string = '';
let buttons = document.querySelectorAll('.visi-but');
let ans = '';
let operations = ['/', '*', '+', '-'];
let rawAns = 0;

// simple rounding function
function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

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
	
	// next break up string into an array with space delimiters
	strArray = breakUp(string);

// now get a raw value for the result of the calculation

rawAns = jujubean(strArray);
rawAns = Math.round(rawAns/.000001)*.000001;


	// next mmodify the display to show the answer to the expression
	document.getElementById('history').innerHTML = string + ' =';
	
// update the string and display to show the result either as whole numbers or 
// exponential notaton based on how large the number is
	if (rawAns > 1000000 || rawAns < .000000) {
		document.getElementById('current').innerHTML = rawAns.toExponential(4).toString();
		ans = rawAns.toExponential(4).toString();
		string = rawAns.toExponential(4).toString();
	} else {
		document.getElementById('current').innerHTML = rawAns.toString();
		ans = rawAns.toString();
		string = rawAns.toString();
	}



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

	if (value == '.') {
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

	// ensures that user can't type an operator right after a parentheses 
	if (['+', '*', '/'].includes(value) && string[string.length - 2] == '(') {
		return
	}

	if (['+', '-', '*', '/', '(', ')'].includes(value)) {
		if (value == '-') {
			if (string.length == 0 || ['+', '*', '/', '('].includes(string[string.length - 2])) {
				string = string + value;
			} else if (string[string.length - 1] == '.' ) {
				if (string.length == 1 || string[string.length - 2] == ' ') {
					return
				}
			} else if (string[string.length - 2] == '-' && string[string.length - 1] == ' ') {
				return;
			} else if (string[string.length-1] =='-') {
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
	console.log(string)
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
	console.log(pressed.key);
	console.log(pressed.keyCode);
	if ('1234567890-*x/+().'.includes(pressed.key)) {
		let value = pressed.key;
		getInput(value);
	}

	// pressing c clears display
	else if (pressed.keyCode === 67) {
		resetDisplay();
	}

	// pressing delete key deletes last
	else if (pressed.keyCode === 8) {
		delLast();
	}

	// pressing return/enter key sets equals
	else if (pressed.keyCode === 13 || pressed.key === '=') {
		updateHistory();
	} else return;

})

// event listener for clearing the display by clicking AC
document.getElementById('clear').addEventListener('click', resetDisplay)


// event listener for delete button - removes last button entry
document.getElementById('delete').addEventListener('click', delLast)


// event listener that updates history when equals is clicked
document.getElementById('equals').addEventListener('click', updateHistory)

