Template.previewTable.helpers({
	handsPlayed: function(userId) {
		var tableId = Router.current().params._id;
		return Hands.find({tableId: tableId, userId: userId}, {
	        sort: [
	            ["order", "desc"]
	        ]
	    });
	},

	countUsersOnTable: function(tableId) {
		var count = 0;
		var table = Tables.findOne({_id: tableId}).users;
		if(table) {
			table.forEach(function(user) {
			  count++;
			});
		}
		return count;
	}
});