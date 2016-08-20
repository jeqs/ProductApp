angular.module('app.services', ['ngResource'])

.service('productService', ['$resource', function($resource){
	 this.item_list = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/list');
	 this.item_detail = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/detail/:id');
	 this.item_create = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/create');
	 this.item_delete = $resource('http://private-bcbaa-productapp.apiary-mock.com/products/delete/:id', {id: '@id'},
    	{
      		delete: {
        	method: 'DELETE'
      		}
    	});
	 
}]);

