const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise     = require('bluebird');
const morgan = require('morgan');
const router =  require('./config/routes');
const bodyParser = require('body-parser');
const { port, env, dbURI, secret } = require('./config/environment');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');

const app = express();

mongoose.set('useFindAndModify', false);

mongoose.connect(dbURI, {
	useCreateIndex: true,
	useNewUrlParser: true
});

if(env === 'development') app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(customResponses);
app.use(router);
app.use(errorHandler);

if (env !== 'test') app.listen(port, () => console.log(`Express is up and running on ${port}!`));

module.exports = app;
