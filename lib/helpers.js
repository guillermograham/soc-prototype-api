function isNumericalString(string) {
	return /^[1-9]\d*$/.test(string);
}

module.exports = { isNumericalString };
