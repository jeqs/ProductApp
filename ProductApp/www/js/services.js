angular.module('app.services', ['ngResource'])

.service('productService', ['$resource', function($resource){
	// Productos
	this.item_list = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/list');
	this.item_detail = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/detail/:id');
	this.item_create = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/create');
	this.item_delete = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/delete/:id', {id: '@id'},
    	{
      		delete: {
        		method: 'DELETE'
      		}
    	});
	 
	// Usuarios
	this.user_create = $resource('http://private-bcbaa-productapp.apiary-mock.com/user/sign-up');
	this.user_detail = $resource('http://private-bcbaa-productapp.apiary-mock.com/user/profile/:id');  
	this.user_edit = $resource('http://private-bcbaa-productapp.apiary-mock.com/user/update/:id', {id: '@id'},
    {   
    	update: {
        	method: 'PUT'
      	}
    });

	this.user_delete = $resource('http://private-bcbaa-productapp.apiary-mock.com/user/delete/:id', {id: '@id'},
    {
    	delete: {
        	method: 'DELETE'
      	}
    });

}]);

