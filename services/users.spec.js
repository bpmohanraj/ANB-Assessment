describe('Fields factory', function() {
  
  // Load our api.Fields module
  beforeEach(angular.mock.module('api.fields'));

  // Set our injected Fields factory (_Fields_) to our local Users variable
  beforeEach(inject(function(_Fields_) {
    Fields = _Fields_;
  }));

  // A simple test to verify the Fields service exists
   it('should exist', function() {
    expect(Fields).toBeDefined();
  }); 
  
  
  
});