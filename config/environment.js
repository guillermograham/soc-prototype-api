const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/soc-prototype-api-${env}`;
const secret = process.env.SESSION_SECRET || 'YghT5s617/1{%sDtjn';

module.exports = { port, env, dbURI, secret };
