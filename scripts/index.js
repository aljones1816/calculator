function add (...args) {
	return args.reduce(function (acc, cur) {
		return acc + cur;
	})
}

function subtract (...args) {
    return args.reduce(function (acc, cur) {
		return acc - cur;
	})
}


function multiply (...args) {
	return args.reduce(function (acc, cur) {
		return acc * cur;
	})
}

function divide(...args) {
	return args.reduce(function (acc, cur) {
		return acc / cur;
	})
}
