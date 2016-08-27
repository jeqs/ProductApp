angular.module('app.services', ['ngResource'])

.service('productService', ['$resource', function($resource){
	// Productos
	this.item_list = $resource('http://138.68.0.83:7070/api/v1/product/list');
	this.item_detail = $resource('http://138.68.0.83:7070/api/v1/product/detail/:id');
	this.item_create = $resource('http://138.68.0.83:7070/api/v1/product/create');
  this.item_update = $resource('http://138.68.0.83:7070/api/v1/product/update/:id', {id: '@id'},
    {   
      update: {
          method: 'PUT'
        }
    });

	this.item_delete = $resource('http://138.68.0.83:7070/api/v1/product/delete/:id', {id: '@id'},
    	{
      		delete: {
        		method: 'DELETE'
      		}
    	});
	 
	// Usuarios
	this.user_create = $resource('http://138.68.0.83:7070/api/v1/user/sign-up');
	this.user_detail = $resource('http://138.68.0.83:7070/api/v1/user/profile/:email');  
	this.user_edit = $resource('http://138.68.0.83:7070/api/v1/user/update/:email', {email: '@email'},
    {   
    	update: {
        	method: 'PUT'
      	}
    });

	this.user_delete = $resource('http://138.68.0.83:7070/api/v1/user/delete/:email', {email: '@email'},
    {
    	delete: {
        	method: 'DELETE'
      	}
    });

  this.user_login = $resource('http://138.68.0.83:7070/api/v1/user/sign-in', null, {
      'login':{
          method: 'POST'
      }
  });

  this.user_forgotpassword = $resource('http://138.68.0.83:7070/api/v1/user/forgot-password/:email', {email: '@email'}, 
    {
      forgot: {
          method: 'PUT'
        }
    });

}]);
