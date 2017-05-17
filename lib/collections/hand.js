import { Meteor } from 'meteor/meteor'

Hands = new Meteor.Collection('hands');

playingHands = function(tableId, userId, cardNum, order) {
	
	card = Cards.findOne({numero: cardNum});
	Hands.insert({tableId: tableId, userId: userId , card: card, order: order});

	var scoreArrayWithoutAce = [];
	var scoreArrayWithAce = [];
	var score = 0;

	var userHand = Hands.find({tableId: tableId, userId: userId}).fetch();
	userHand.forEach(function(hand) {
		if(hand.card.value != 11) {
			scoreArrayWithoutAce.push(hand.card.value);
		}
		else {
			scoreArrayWithAce.push(hand.card.value);
		}
	});

	scoreArrayWithoutAce.forEach(function(value) {
		score += value;
	});
	scoreArrayWithAce.forEach(function(value) {
		if (score >10) {
			score += 1;
		}
		else {
			score += 11;
		}
	});

	Score.update({userId: userId, tableId: tableId}, {$set: {score: score} });
};
