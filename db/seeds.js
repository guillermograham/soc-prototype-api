const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI);

const User = require('../models/user');

User.collection.drop();

User.create([{
	username: 'will',
	deviceId: 'krjhkbc',
	hiScore:  27847
},{
	username: 'jim',
	deviceId: 'sljvrneivn',
	hiScore:  9484
},{
	username: 'ed',
	deviceId: 'jdhkdhbj',
	hiScore:  7784
},{
	username: 'peeg',
	deviceId: 'gbhkfj',
	hiScore:  84849
},{
	username: 'cam',
	deviceId: 'dkfknd',
	hiScore:  88549
},{
	username: 'culley',
	deviceId: 'fdkjv',
	hiScore:  945758
},{
	username: 'badger',
	deviceId: 'dfbvj',
	hiScore:  0
}], (err, users) => {
	if (err) console.log(err);
	if (users) console.log(`${users.length} users created!`);

	mongoose.connection.close();
});
