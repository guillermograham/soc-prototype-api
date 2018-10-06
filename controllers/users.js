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

function showRoute(req, res, next) {
	User
		.findById(req.params.id)
		.exec()
		.then((user) => {
			if(!user) return res.notFound();
			return res.json(user);
		})
		.catch(next);
}

module.exports = {
	index: indexRoute,
	show: showRoute
};
