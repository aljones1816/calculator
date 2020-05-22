let string = '';
let buttons = document.querySelectorAll('.visi-but');
let ans = '';
let operations = ['/', '*', '+', '-'];

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
function closeThoseParens(string) {
	let openTicker = 0;
	let closedTicker=0;
	for (let i = 0; i < string.length; i++) {
		if (string[i] == '(') {
			openTicker++;
			console.log(openTicker);
		} else if (string[i] == ')') {
			closedTicker++;
		}
	}

	while (openTicker > closedTicker){
		string = string + ')';
		closedTicker++;
	}


}

// function that updates the history when equals pressed
function updateHistory() {
	console.log(string);
	if (string[0] == ' ') {
		string = string.slice(1, string.length - 1)
	}

	if (string[string.length - 1] == ' ') {
		string = string.slice(0, string.length - 1);
	}
	console.log(string);
	if (string.length == 0) {
		string = '0';
	}
	strArray = breakUp(string);
	closeThoseParens(strArray);
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

// event listener for retrieving user input and displaying it on screen
buttons.forEach(button => {
	button.addEventListener('click', function () {
		// ensures that two operations aren't pressed in a row
		// doesn't allow two spaces to be typed in a row
		let openCount = 0;
		if (button.value == ')') {
			
			for (let i = 0; i<string.length;i++) {
				if (string[i] == '(') {
					openCount++;
				}
			}
			if (openCount < 1) {
				return
			}
		}
		
		if (['*', '/', '-', '+', '(', ')'].includes(button.value)) {
			if (['*', '/', '+', '-'].includes(string[string.length - 2]) && operations.includes(button.value)) {
				return
			} else if (string[string.length - 1] == ' ') {
				string = string + button.value + ' ';
			} else {
				string = string + ' ' + button.value + ' ';
			} 
		} else string += button.value;



		updateDisplay();

	});
})

// event listener for clearing the display
document.getElementById('clear').addEventListener('click', resetDisplay)

// event listener for delete button - removes last button entry
document.getElementById('delete').addEventListener('click', delLast)

// event listener that updates history when equals is clicked
document.getElementById('equals').addEventListener('click', updateHistory)

function jujubean(stringArray) {
	for (let i = stringArray.length - 1; i >= 0; i--) {
		if (stringArray[i] == '(') {
			for (let j = i; j <= stringArray.length - 1; j++) {
				if (stringArray[j] == ')') {
					console.log('before',stringArray);
					stringArray.splice(i, j-i+1, evalToo(stringArray.slice(i+1,j))[0].toString())
					
					console.log('after',stringArray)
					break;
				}

			}
		}
	}


	return evalToo(stringArray)[0];

}