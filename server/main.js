import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.setInterval(function () {
	var usersOffline = Meteor.users.find({ "status.online": false }).fetch();
	usersOffline.forEach(function(userOffline) {
		var tablesWhereUsersOffline = Tables.find({ 'users._id': userOffline._id}).fetch();
		if(tablesWhereUsersOffline) {
			tablesWhereUsersOffline.forEach(function(table) {
				Tables.update({_id: table._id}, { $pull: { users: {_id: userOffline._id}}});
				Turns.remove({'user._id': userOffline._id, tableId: table._id});
				Score.remove({userId: userOffline._id, tableId: table._id});
				console.log(userOffline.username+' leave table '+ table.name);
			});
		}
	});
}, 1000);