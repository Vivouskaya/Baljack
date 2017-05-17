import { Meteor } from 'meteor/meteor'

Tables = new Mongo.Collection('tables');

Meteor.methods({

	addUserOnThisTable: function(tableId) {
		
		var currentUser = Meteor.user();
		if(currentUser) {
			var userOnThisTableExist = Tables.findOne({_id: tableId, user: currentUser});
			if (!userOnThisTableExist) {
				Tables.update({_id: tableId}, { $addToSet: { users: currentUser }});
				var positionOnTable = Tables.findOne({_id: tableId}).users;
				var countPlayer = 0;
				positionOnTable.forEach(function(position) {
				  countPlayer++;
				});
				var userTurnIsExist = Turns.findOne({user: currentUser, tableId: tableId});
				if(!userTurnIsExist) {
					Turns.insert({user: currentUser, tableId: tableId, flagged: "waiting", position: countPlayer});
					Score.insert({userId: currentUser._id, tableId: tableId, score: 0});
				}
			}
		}
		return currentUser;
	},

	removeUserOnThisTable: function(tableId) {
		if(Meteor.user()) {
			var currentUser = Meteor.user();
			Tables.update({_id: tableId}, { $pull: { users: currentUser }});
			Turns.remove({'user._id': currentUser._id, tableId: tableId});
			Hands.remove({userId: currentUser._id, tableId: tableId});
			Score.remove({userId: currentUser._id, tableId: tableId});
		}
	},

	dealCard: function(tableId, userId) {

		if(Hands.find({tableId: tableId}).count() < 52) {
			var cardNum = Math.floor((Math.random() * (52-0) )+1);
			var playingCardExist = Hands.findOne({tableId: tableId, 'card.numero': cardNum});

			while(playingCardExist) {
				cardNum = Math.floor((Math.random() * (52-0) )+1);
				playingCardExist = Hands.findOne({tableId: tableId, 'card.numero': cardNum});
			}
			
			var order = Hands.find({tableId: tableId, userId: userId}).count() + 1;
			playingHands(tableId, userId, cardNum, order);

			var score = Score.findOne({userId: userId, tableId: tableId}).score;

			if(score >= 21) {
				var turnId = Turns.findOne({'user._id': userId, tableId: tableId})._id;
				Turns.update({_id: turnId}, {$set: {'flagged':'done'}});
			}
		}
		// CONFIGURER MESSAGE D'ERREUR
		else { return console.log('TOUTES LES CARTES SONT SORTIES'); }
	},

	doneCard: function(tableId) {
		var userId = Meteor.userId();
		var turnId = Turns.findOne({'user._id': userId, tableId: tableId})._id;
		Turns.update({_id: turnId}, {$set: {'flagged':'done'}});		
	},

	removeHands: function(turnUserId) {
		Hands.remove({userId: turnUserId});
	},

	dealCroupierCard: function(tableId) {

		if(Hands.find({tableId: tableId}).count() < 52) {
			var cardNum = Math.floor((Math.random() * (52-0) )+1);
			var playingCardExist = Hands.findOne({tableId: tableId, 'card.numero': cardNum});

			while(playingCardExist) {
				cardNum = Math.floor((Math.random() * (52-0) )+1);
				playingCardExist = Hands.findOne({tableId: tableId, 'card.numero': cardNum});
			}
			var userId = 'croupierID_'+tableId;
			var order = Hands.find({tableId: tableId, userId: userId}).count() + 1;
			playingHands(tableId, userId, cardNum, order);

			var score = Score.findOne({userId: userId, tableId: tableId}).score;
		}
		// CONFIGURER MESSAGE D'ERREUR
		else { return console.log('TOUTES LES CARTES SONT SORTIES'); }
	}
});
