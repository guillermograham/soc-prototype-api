process.env.NODE_ENV = 'test';
const app = require('../index');

const chai = require('chai');
global.should = chai.should();
global.expect = chai.expect;
chai.use(require('chai-sorted'));

const supertest = require('supertest');
global.api = supertest(app);
