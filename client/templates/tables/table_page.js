Template.tablePage.onCreated(function() {

});

Template.tablePage.onDestroyed(function() { 
  
	Meteor.call('removeUserOnThisTable', this.data._id, function(error, result) {
        return true;
  });
});

Template.tablePage.helpers({
	handsPlayed: function(userId) {
		var tableId = Router.current().params._id;
		return Hands.find({tableId: tableId, userId: userId}, {
        sort: [
            ["order", "desc"]
        ]
    });
	},
  
  handsCroupier: function() {
    var tableId = Router.current().params._id;
    var userId = 'croupierID_'+tableId;
    return Hands.find({tableId: tableId, userId: userId}, {
        sort: [
            ["order", "desc"]
        ]
    });
  },

  currentUserOnTable: function() {
    currentUserId = Meteor.userId();
    var tableId = Router.current().params._id;
    var request = Tables.findOne({_id: tableId, 'users._id': currentUserId});
    if(request) {
      return true;
    }
    else {
      return false;
    }
  },

  playerSelected: function() {
    var tableId = Router.current().params._id;
    return Turns.findOne({tableId: tableId, flagged: "in_progress"});
  },

  yourTurn: function() {
    var tableId = Router.current().params._id;
    return Turns.findOne({tableId: tableId, flagged: "in_progress", 'user._id': Meteor.userId()});
  }

});

Template.tablePage.events({
  'click .deal': function(e) {
  	var tableId = Router.current().params._id;
    var userId = Meteor.userId();
    Meteor.call('dealCard', tableId, userId, function(error, result) {});
  },
  'click .done': function(e) {
    var tableId = Router.current().params._id;
    Meteor.call('doneCard', tableId, function(error, result) {
      
    });
  },
  'click .sit': function(e) {
    var tableId = Router.current().params._id;
    Meteor.call('addUserOnThisTable', tableId, function(error, result) {
        
    });
  },
  'click .standup': function(e) {
    var tableId = Router.current().params._id;
    Meteor.call('removeUserOnThisTable', tableId, function(error, result) {
    
    });
  }
});