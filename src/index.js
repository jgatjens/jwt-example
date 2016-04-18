import dotenv from 'dotenv';
import express from 'express';
// import compression from 'compression';

import db from './services/db'
import routeUsers  from './routes/users';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';

dotenv.config();

var app = express();

// configure the app to use bodyParser()
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());

// allow user to create an user and login.
app.use(expressJWT({ secret: process.env.SECRET }).unless(function(req) {
	return (
    req.originalUrl === '/users/login' && req.method === 'POST' ||
    req.originalUrl === '/users' && req.method === 'POST'
   )
}));

app.use('/users', routeUsers);

// send json responde for unauthorized request
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json(err.message);
	} else {
		res.status(500);
	}
});

var server = app.listen(3000, function () {
    console.log('Listening on port 3000!');
});

module.exports = server;
