const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

router.get('/', (req, res) => {
	res.end('Hit /users to get User list');
});

router.route('/users/:id')
	.get(users.show);

router.route('/users')
	.get(users.index);

router.get('*', (req, res) => {
	res.end('404!');
});

module.exports = router;
