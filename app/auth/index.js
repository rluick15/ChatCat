'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const h = require('../helpers')

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		h.findById(id)
			.then(user => done(null, user))
			.catch(error => console.log('User deserializing error'));
	});

	let authProcessor = (accessToken, refreshToken, profile, done) => {
		h.findOne(profile.id)
			.then(result => {
				if(result) {
					done(null, result);
				} else {
					//create a new user
					h.createNewUser(profile)
						.then(newChatUser => done(null, newChatUser))
						.catch(error => console.log('Create new user error'));
				}
			});
	}
	
	passport.use(new FacebookStrategy(config.fb, authProcessor));
	passport.use(new TwitterStrategy(config.twitter, authProcessor));
}