'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

//Log an error
Mongoose.connection.on('error', error => {
	console.console.log("MongoDB Error: ", error);
});

//Create a Schema
const chatUser = new Mongoose.Schema({
	profileId: String,
	fullName: String,
	profilePic: String
});

//Turn schema into model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
	Mongoose,
	userModel
}