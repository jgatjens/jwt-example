import Users from '../models/usersModel';
import jwt from 'jsonwebtoken';

/**
 * authController.js
 *
 * @description :: Server-side logic for managing Auth.
 */
module.exports = {

	/**
	 * authController.login()
	 */
	login: function(req, res) {


		// return res.status(200).json(req.body);

		if (!req.body.username) {
			return res.status(400).send('username required');
		}

		if (!req.body.password) {
			return res.status(400).send('password required');
		}

		User.findOne({ username: req.body.username }, function (err, user){
			user.comparePassword(req.body.password, function (err, isMatch) {

				if (err) throw err;

				if (!isMatch) {
					return res.status(401).send('invalid username or password');
				} else {
					var token = jwt.sign({ username: req.body.username }, process.env.SECRET)
					return res.status(200).json(token);
				}
			})
		})
	}

};
