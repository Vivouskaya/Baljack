Template.tablesList.helpers({  
  tables: function() { 
  	return Tables.find({}, {
	        sort: [
	            ["name", "asc"]
	        ]
	    });
  }
});