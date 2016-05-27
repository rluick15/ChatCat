'use strict';

module.exports = (io, app) => {
	let allrooms = app.locals.chatrooms;

	allrooms.push({
		room: 'Good Food',
		roomId: '0001',
		users: []
	});

	allrooms.push({
		room: 'Cloud Computing',
		roomId: '0002',
		users: []
	});

	io.of('/roomslist').on('connection', socket => {
		socket.on('getChatrooms', () => {
			console.log(JSON.stringify(allrooms));
			socket.emit('chatRoomsList', JSON.stringify(allrooms));
		});
	});
}