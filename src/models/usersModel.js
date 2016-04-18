import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
		"gender": String,
		"name": String,
		"email": String,
		"username": String,
		"password": String,
		"phone": String,
		"cell": String,
		"location": {
			"street": String,
			"city": String,
			"state": String,
			"zip": Number
		},
		"picture": {
			"large": String,
			"medium": String,
			"thumbnail": String
		}
});

// Include text index so then we can make searchs
// userSchema.index({ email: 'text', username: 'text'});

module.exports = mongoose.model('users', userSchema);
