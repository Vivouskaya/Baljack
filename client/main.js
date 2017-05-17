Tracker.autorun(function() {
	var allTables = Tables.find().fetch();
	allTables.forEach(function(table) {
		if(table.users && table.users.length > 0) {
			var usersOnTable = table.users;
			var turnsOnTable = Turns.find({tableId: table._id}).fetch();
			turnsOnTable.forEach(function(turnOnTable) {
				console.log(turnOnTable.user._id);
				// variables
				var userWaiting = Turns.findOne({tableId: table._id, flagged: "waiting"});
				var userReady = Turns.findOne({tableId: table._id, flagged: "ready"} , {sort: [["order", "asc"]]});
				var userInProgress = Turns.findOne({tableId: table._id, flagged: "in_progress"});
				var userDone = Turns.findOne({tableId: table._id, flagged: "done"});
				// compteurs
				var countAllUsersNotWaiting = 0;
				var countAllUsersReady = 0;
				var countAllUsersDone = 0;
				// incrémentation des compteurs
				var allUsersNotWaiting = Turns.find({ flagged: { $nin: [ "waiting" ] }}).fetch();
				allUsersNotWaiting.forEach(function(user) {
					countAllUsersNotWaiting++;
				});
				var allUsersDone = Turns.find({ flagged: "done"}).fetch();
				allUsersDone.forEach(function(user) {
					countAllUsersDone++;
				});
				var allUsersReady = Turns.find({ flagged: "ready"}).fetch();
				allUsersReady.forEach(function(user) {
					countAllUsersReady++;
				});

				// conditions

				// si tous les users sont ready, passer les waiting à ready
				if(userWaiting && !userInProgress && !userDone ) {
					var allUsersIsWaiting = Turns.find({tableId: table._id, flagged: "waiting"}).fetch();
					allUsersIsWaiting.forEach(function(turn) {
						Turns.update({_id: turn._id}, {$set: {'flagged':'ready'}});
					});
				}
				// si
				if (countAllUsersNotWaiting != 0 && countAllUsersReady != 0 && countAllUsersNotWaiting == countAllUsersReady) {
					var userId = 'croupierID_'+table._id;
					var handsCroupier = Hands.find({userId: userId}).fetch();
					if(handsCroupier.length > 0) {
						handsCroupier.forEach(function(hand) {
							Hands.remove({_id: hand._id});
						});
					}
					// distribution de cartes croupier et joueurs

					//joueurs
					/*
					Meteor.call('dealCard', table._id, turnOnTable.user._id, function(error, result) {});
					Meteor.call('dealCard', table._id, turnOnTable.user._id, function(error, result) {});
					*/

					//croupier
					/*
					Meteor.call('dealCroupierCard', table._id, function(error, result) {});
					Meteor.call('dealCroupierCard', table._id, function(error, result) {});
					*/
				}
				// si user ready et aucuns in_progress, passer à progress selon la position de l'user
				if(userReady && !userInProgress) {
					Turns.update({_id: userReady._id}, {$set: {'flagged':'in_progress'}});
				}
				// si tous les utilisateurs (sauf ceux waiting) sont flagged done, les passer à waiting
				if (countAllUsersNotWaiting != 0 && countAllUsersDone != 0 && countAllUsersNotWaiting == countAllUsersDone) {
					allUsersDone.forEach(function(user) {
						// petit temps d'attente
						setTimeout(function(){
							Meteor.call('removeHands', user.user._id, function(error, result) {});
		                  	var score = Score.findOne({userId: user.user._id, tableId: table._id});
		                  	Score.update({_id: score._id}, {$set: {score: 0} });
			            	Turns.update({_id: user._id}, {$set: {'flagged':'waiting'}});
			            }, 3000);
					});
				}
			});
		}
		else {
			var userId = 'croupierID_'+table._id;
			var handsCroupier = Hands.find({userId: userId}).fetch();
			if(handsCroupier.length > 0) {
				handsCroupier.forEach(function(hand) {
					Hands.remove({_id: hand._id});
				});
			}
		}
	});
});

