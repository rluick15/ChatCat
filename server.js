'use strict';
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
	app.use(express.static('views'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
	res.render('login');
});

app.listen(app.get('port'), () => {
	console.log("ChatCat Running on Port: ", app.get('port'));
});