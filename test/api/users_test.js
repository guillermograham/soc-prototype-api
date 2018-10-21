require('../spec_helper');

const User = require('../../models/user');

describe('Users Controller Test', () => {
	afterEach(done => {
		User.collection.drop();
		done();
	});

	describe('Users index test', () => {
		beforeEach(done => {
			User.create({
				username: 'TestPerson',
				deviceId: 'dhdud787bc',
				hiScore: 7884
			})
			.then(() => done())
			.catch(done);
		});

		describe('GET /users', () => {
			it ('should return a 200 response', done => {
				api
					.get('/users')
					.set('Accept', 'application/json')
					.expect(200, done);
			});
			it ('should return an array of users', done => {
				api
					.get('/users')
					.set('Accept', 'application/json')
					.end((err, res) => {
						expect(res.body)
							.to.be.an('array')
							.and.have.property(0)
							.and.have.all.keys([
								'_id',
								'__v',
								'createdAt',
								'updatedAt',
								'username',
								'deviceId',
								'hiScore'
							]);
						done();
					});
			});
		});
	});
});

describe('Invalid URL test', () => {
	describe('GET /unrecognised-url', () => {
		it ('should return a 404 response', done => {
			api
				.get('/invalid-url')
				.set('Accept', 'application/json')
				.expect(404, done);
		});
	});
});

describe('Users Sort test', () => {
	afterEach(done => {
		User.collection.drop();
		done();
	});

	describe('Users Sort test', () => {
		beforeEach(done => {
			User.create({
				username: 'TestPerson',
				deviceId: 'dhdud787bc',
				hiScore: 7884
			},{
				username: 'TestPerson2',
				deviceId: 'khvbjp9e8d',
				hiScore: 12000
			},{
				username: 'TestPerson3',
				deviceId: 'fkjvi898ufv',
				hiScore: 1
			})
			.then(() => done())
			.catch(done);
		});

		describe('GET /users-sort', () => {
			it ('should return a 200 response', done => {
				api
					.get('/users-sort')
					.set('Accept', 'application/json')
					.expect(200, done);
			});
		});
		it ('should return an array of users', done => {
			api
				.get('/users-sort')
				.set('Accept', 'application/json')
				.end((err, res) => {
					expect(res.body)
						.to.be.an('array')
						.and.have.property(0)
						.and.have.all.keys([
							'_id',
							'__v',
							'createdAt',
							'updatedAt',
							'username',
							'deviceId',
							'hiScore'
						]);
					done();
				});
		});
		it ('should be sorted in descending order of hiScore', done => {
			api
				.get('/users-sort')
				.set('Accept', 'application/json')
				.end((err, res) => {
					expect(res.body)
						.to.be.an('array')
						.and.to.be.sortedBy('hiScore', { descending: true });
					done();
				});
		});
	});
});

describe('Users Sort Limit test', () => {
	afterEach(done => {
		User.collection.drop();
		done();
	});

	describe('Users Sort Limit test', () => {
		beforeEach(done => {
			User.create({
				username: 'TestPerson',
				deviceId: 'dhdud787bc',
				hiScore: 7884
			},{
				username: 'TestPerson2',
				deviceId: 'khvbjp9e8d',
				hiScore: 12000
			},{
				username: 'TestPerson3',
				deviceId: 'fkjvi898ufv',
				hiScore: 1
			})
			.then(() => done())
			.catch(done);
		});

		describe('GET /users-sort/:number', () => {
			it ('should return a 200 response', done => {
				api
					.get('/users-sort/2')
					.set('Accept', 'application/json')
					.expect(200, done);
			});
		});
		it ('should return an array of users', done => {
			api
				.get('/users-sort/2')
				.set('Accept', 'application/json')
				.end((err, res) => {
					expect(res.body)
						.to.be.an('array')
						.and.have.property(0)
						.and.have.all.keys([
							'_id',
							'__v',
							'createdAt',
							'updatedAt',
							'username',
							'deviceId',
							'hiScore'
						]);
					done();
				});
		});
		it ('should be sorted in descending order of hiScore', done => {
			api
				.get('/users-sort/2')
				.set('Accept', 'application/json')
				.end((err, res) => {
					expect(res.body)
						.to.be.an('array')
						.and.to.be.sortedBy('hiScore', { descending: true });
					done();
				});
		});
		it ('should have a length property of 2', done => {
			api
				.get('/users-sort/2')
				.set('Accept', 'application/json')
				.end((err, res) => {
					expect(res.body)
						.to.be.an('array')
						.and.to.have.length(2);
					done();
				});
		});
		it ('should return a 400 response if a non-numerical parameter is provided', done => {
			api
				.get('/users-sort/2*2')
				.set('Accept', 'application/json')
				.expect(400, done);
		});
		it ('should return all of the users if the parameter is greater than the sum of all users', done => {
			api
				.get('/users-sort/40')
				.set('Accept', 'application/json')
				.end((err, res) => {
					expect(res.body)
						.to.be.an('array')
						.and.to.have.length(3);
					done();
				});
		});
	});
});

describe('Users Show test', () => {
	afterEach(done => {
		User.collection.drop();
		done();
	});

	beforeEach(done => {
		User.create({
			username: 'TestPerson',
			deviceId: 'dhdud787bc',
			hiScore: 7884
		})
		.then(() => done())
		.catch(done);
	});

	describe('GET /users/invalid-user-id', () => {
		it ('should return a 404 response', done => {
			api
				.get('/users/invalid-user-id')
				.set('Accept', 'application/json')
				.expect(404, done);
		});
	})
});
