const  mongoose = require('mongoose');

const User = require('../models/user');
const { isNumericalString } = require('../lib/helpers');

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

function indexSort(req, res, next) {
	User
		.find()
		.sort({ hiScore: 'descending' })
		.exec()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			console.log(err);
		});
}

function indexSortLimit(req, res, next) {
	if (!isNumericalString(req.params.number)) return res.badRequest('Invalid number: Provide a whole, positive number');

	const quantity = parseInt(req.params.number);

	User
		.find()
		.sort({ hiScore: 'descending' })
		.exec()
		.then((users) => {
			const topSection = users.splice(0, quantity);
			res.json(topSection);
		})
		.catch((err) => {
			console.log(err);
		});
}



function showRoute(req, res, next) {
	console.log('inside showRoute now');
			console.log('this is params: ', req.params);
	User
		// .findOne({id: req.params.id})
		.findById(req.params.id)
		.exec()
		.then((user, err) => {
			console.log('this is user: ', user);
			// if (!user) return res.status(404).json({ 'message': 'User not found'});
			if(!user) {
				console.log('inside !user');
				return res.notFound();
			}

			console.log('err here: ', err);

			if (err.name === 'CastError') {
				console.log('in second if block');
				return res.notFound();
			}
			// if(!user) throw err;
			res.json(user);
		})
		// .catch((err) => {
		// 	if(err.name === 'CastError') {
    //     return res.notFound();
    //   }
    //   next();
		// });
		.catch((err) => {
			console.log('in catch block');
			if (err.name === 'CastError') {
				console.log('in cast error if block');
				return res.notFound();
			}
			console.log('err in catch: ', err);
			next(err);
		})
		.catch(next);
		// .catch(next);
}

function updateRoute(req, res, next) {
	User
		.findByIdAndUpdate(req.params.id, {
			$set: { hiScore: req.body.hiScore }
		}, { new: true })
		.exec()
		.then((user) => {
			if(!user) return res.notFound();
			return res.json(user);
		})
		.catch(next);
}

module.exports = {
	index: indexRoute,
	indexSort: indexSort,
	indexSortLimit: indexSortLimit,
	show: showRoute,
	update: updateRoute
};
