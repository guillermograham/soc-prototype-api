const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

router.get('/', (req, res) => {
	res.end('Hit /users to get User list');
});

router.route('/users-sort/:number')
	.get(users.indexSortLimit);

router.route('/users-sort')
	.get(users.indexSort);

router.route('/users/:id')
	.get(users.show)
	.put(users.update);

router.route('/users')
	.get(users.index);

router.get('*', (req, res) => {
	res.notFound();
});

module.exports = router;
