import Users from '../models/usersModel';
import jwt from 'jsonwebtoken';

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

	/**
	* userController.search()
	*/
	search: function (req, res) {
	   let q = req.query.q;
	   Users.find({ $text: { $search: q } }, function(err, users) {
	      if(err) {
	          return res.status(500).json({
	              message: 'Error on search.'
	          });
	      }
	      return res.json(users);
	   });
	},


	/**
	* userController.list()
	*/
	list: function(req, res) {
	   Users.find(function(err, users){
	      if(err) {
	          return res.status(500).json({
	              message: 'Error getting user.'
	          });
	      }
	      return res.json(users);
	   });
	},

	/**
	* userController.show()
	*/
	show: function(req, res) {
		var id = req.params.id;
		Users.findOne({_id: id}, function(err, user){
		   if(err) {
		       return res.status(500).json({
		           message: 'Error getting user.'
		       });
		   }
		   if(!user) {
		       return res.status(404).json( {
		           message: 'No such user'
		       });
		   }
		   return res.json(user);
		});
	},

	/**
	* userController.create()
	*/
	create: function(req, res) {
	   var user = new Users(req.body);
	   var token = jwt.sign({ username: req.body.username }, process.env.SECRET)

	   user.save(function(err, user){
	      if(err) {
	          return res.status(500).json( {
	              message: 'Error saving user',
	              error: err
	          });
	      }
	      return res.json({
	          message: 'saved',
	          _id: user._id,
	          token: token
	      });
	   });
	},


 	/**
	 * userController.login()
	 */
	login: function(req, res) {

		if (!req.body.username) {
			return res.status(400).send('username required');
		}

		if (!req.body.password) {
			return res.status(400).send('password required');
		}


		// return res.status(200).json(req.body);
		debugger;
		User.findOne({ username: req.body.username }, function (err, user) {

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
	},

   /**
    * userController.update()
    */
   update: function(req, res) {

		var id = req.params.id;
		Users.findOne({_id: id}, function(err, user){
		   if(err) {
		       return res.status(500).json({
		           message: 'Error saving user',
		           error: err
		       });
		   }
		   if(!user) {
		       return res.status(404).json({
		           message: 'No such user'
		       });
		   }

		   user.gender = req.body.gender;
		   user.email =  req.body.email ? req.body.email : user.email;
		   user.username = req.body.username;
		   user.password = req.body.password;
		   user.salt = req.body.salt;
		   user.md5 = req.body.md5;
		   user.sha1 = req.body.sha1;
		   user.sha256 = req.body.sha256;
		   user.registered = req.body.registered;
		   user.dob = req.body.dob;
		   user.phone = req.body.phone;
		   user.cell = req.body.cell;
		   user.PPS = req.body.PPS;
		   user.picture = req.body.picture;

		   user.save(function(err, user){
		       if(err) {
		           return res.status(500).json({
		               message: 'Error getting user.'
		           });
		       }
		       if(!user) {
		           return res.status(404).json({
		               message: 'No such user'
		           });
		       }
		       return res.json(user);
		   });
		});

   },

   /**
    * userController.remove()
    */
   remove: function(req, res) {
		var id = req.params.id;
		Users.findByIdAndRemove(id, function(err, user){
		   if(err) {
		       return res.json(500, {
		           message: 'Error getting user.'
		       });
		   }
		   return res.json(user);
		});
   }
};
