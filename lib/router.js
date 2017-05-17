Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'tablesList'});
Router.route('/table/:_id', {  
	name: 'tablePage',
	data: function() { return Tables.findOne(this.params._id); }
});
