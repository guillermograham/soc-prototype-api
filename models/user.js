const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	deviceId: { type: String, required: true, unique: true },
	hiScore: Number
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);
