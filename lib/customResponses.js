function customResponses(req, res, next) {

	res.notFound = function notFound() {
		const err = new Error('Not Found');
		err.message = 'Not found';
		err.status = 404;

		throw err;
	};

	res.badRequest = function badRequest(message) {
		const err = new Error('Bad Request');
		err.message = message;
		err.status = 400;

		throw err;
	}
	next();
}

module.exports = customResponses;
