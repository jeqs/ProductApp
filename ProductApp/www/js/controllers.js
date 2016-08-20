angular.module('app.controllers',  ['app.services'])
  
.controller('opcionesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
  
.controller('cuentaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
    
.controller('homeCtrl', ['$scope', '$stateParams', 'productService', 
	function ($scope, $stateParams, productService) {

		$scope.getProductList = function(){
			productService.item_list.query(function(data){
				$scope.list = data;
				console.log($scope.list);
		    });
		}
	
		$scope.getProductDetail = function(_id){
			localStorage.setItem('id', _id);
			console.log(_id);
		}

		var data = {
			"name": "Galaxy Tab",
	        "type": "smartphone",
	        "quantity": 10,
	        "price": 1200000
	    };

	    $scope.productCreate = function(){
			productService.item_create.save(data, function(data){
        		$scope.data = data;
        		console.log($scope.data);
    		});
		}

	}
])

.controller('productoCtrl', ['$scope', '$stateParams', 'productService', 
function ($scope, $stateParams, productService) {

	var _id = localStorage.getItem('id');
	console.log(_id);

	productService.item_detail.get({id: _id}, function(data){
	        	$scope.detail = data;
	        	console.log($scope.detail);
	});

}])
