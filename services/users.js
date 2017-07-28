(function() {
  'use strict';

  // Creating the module and factory we referenced in the beforeEach blocks in our test file
  angular.module('api.fields', [])
  .factory('Fields', function() {
    
	var Fields = {};
	var fieldsList = [
			{
			  name: 'name',
			  title: 'Name',
			  required: true,
			  type: {
				view: 'input'
			  }
			},
			{
			  name: 'age',
			  title: 'Age',
			  required: true,
			  type: {
				view: 'number'
			  }
			},
			{
			  name: 'country',
			  title: 'Country',
			  type: {
				view: 'select',
				options: [
				  {id: 0, name: 'USA'},
				  {id: 1, name: 'German'},
				  {id: 2, name: 'Russia'}
				]
			  }
			},
			{
			  name: 'licenceAgreement',
			  title: 'Licence Agreement',
			  type: {
				view: 'checkbox'
			  }
			},
			{
			  name: 'description',
			  title: 'Description',
			  type: {
				view: 'textarea'
			  }
			}
		];
    
	
	//The single field we expect to receive when calling findByName('description')
	  var singleField = {
		name: 'description',
		title: 'Description',
		type: {
			view: 'textarea'
		}
	  };

    // Defining findByName to make our test pass. Once again, it doesn't need to do anything yet.
    Fields.findByName = function(name) {
      // Returning a single field object as our test expects it to
      return fieldsList.find(function(field) {
        return field.name === name;
      });
    };

    return Fields;
  });
})();