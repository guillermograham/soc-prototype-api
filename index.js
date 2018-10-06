const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router =  require('./config/routes');
const { port, env, dbURI, secret } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');

const app = express();

mongoose.connect(dbURI);

if(env === 'development') app.use(morgan('dev'));

app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Express is up and running on ${port}!`));
