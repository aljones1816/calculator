let string = '';
let buttons = document.querySelectorAll('.visi-but');

// basic arithmetic functions - each takes user input and returns a single number
function add(numArray) {
	return numArray.reduce(function (acc, cur) {
		return acc + cur;
	})
}

function subtract(numArray) {
	return numArray.reduce(function (acc, cur) {
		return acc - cur;
	})
}


function multiply(numArray) {
	return numArray.reduce(function (acc, cur) {
		return acc * cur;
	})
}

function divide(numArray) {
	return numArray.reduce(function (acc, cur) {
		return acc / cur;
	})
}

// function that takes an array of numbers and calls one of the arithmetic functions
function operate(operator, numArray) {
	if (operator == 'add') {
		return add(numArray);
	} else if (operator == 'subtract') {
		return substract(numArray);
	} else if (operator == 'multiply') {
		return multiply(numArray);
	} else if (operator == 'divide') {
		return divide(numArray);
	} else return;
}

// function for deleting last entry
function delLast() {
	if (string.length > 1) {
		string = string.substring(0, string.length - 1);
		updateDisplay();
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
	document.getElementById('history').innerHTML = string + ' ='
}

// function to reset display when clear is pressed
function resetDisplay() {
	if (string.length == 0) {
		string = '0';
	}
	document.getElementById('history').innerHTML = 'ans = ' + string;
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