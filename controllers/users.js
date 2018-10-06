const User = require('../models/user');

function indexRoute(req, res, next) {
	User
		.find()
		.exec()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(500).end(err);
		});
}

module.exports = {
	index: indexRoute
}
