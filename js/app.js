var app = angular.module('app', []).config(function() { });
app.controller('PropertyEditorController', function ($scope, $http) {

  // entity to edit
  $scope.entity = {
    name: 'Max',
	age: 28,
    country: 2,
    agree: true,
    comments: 'Property Editor Control'
  };

  // fields description of entity
  $http.get('js/propertyeditor.json')
       .then(function(response){
          $scope.fields =response.data;                
        });
});