angular.module('app.controllers', ['app.services', 'ngCordova'])
  
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
		    });
		}
	
		$scope.getProductDetail = function(_id){
			$stateParams.id = _id;
			console.log(_id);
		}
	}
])

.controller('productoCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs',
	function ($scope, $stateParams, productService, $cordovaDialogs) {

		var _id = $stateParams.id; 
		console.log(_id);

		productService.item_detail.get({id: _id}, function(data){
		        	$scope.detail = data;
		        	console.log($scope.detail);
		});

		$scope.productDelete = function(){
			console.log(_id);

			// Dialog Confirm
			$cordovaDialogs.confirm('Desea eliminar el producto: ', 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) {
		      		var btnIndex = buttonIndex; // no button = 0, 'OK' = 1, 'Cancel' = 2
		      		console.log(btnIndex);

		      		if (buttonIndex == 1) {
		      			productService.item_delete.delete({id:_id});
		      		}
    			}	

		    ); // fin dialog
		}
}])

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
   
.controller('editarPerfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('ingresarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cambiarContraseACtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('registrarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
     
.controller('editarProductoCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs',
function ($scope, $stateParams, productService, $cordovaDialogs) {

	var _id = $stateParams.id;
	console.log(_id);

	productService.item_detail.get({id: _id}, function(data){
	        	$scope.detail = data;
	        	console.log($scope.detail);
	});

    $scope.updateProducto = function(_inputName, _inputType, _inputQuantity,  _inputPrice, _oldName){

    		console.log(_oldName);
	
			var _id2 = $stateParams.id;

			var dataUpdate={ 
    			"id": _id2,
			  "name": _inputName,
	          "type": _inputType,
	           "quantity": _inputQuantity,
	           "price": _inputPrice
    		};
    		
    		// Dialog Confirm
			$cordovaDialogs.confirm('Confirma el cambio de producto Id: ' + _id2.toString() , 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) {
		      		var btnIndex = buttonIndex; // no button = 0, 'OK' = 1, 'Cancel' = 2
		      		
		      		if (buttonIndex == 1) {
		      			console.log("si");	
		      			 productService.edit.update({id: _id2}, function(dataUpdate){
	        				$scope.detail = dataUpdate;
						});

		      			console.log(dataUpdate);
		      		}
    			}	

		    ); // fin dialog

  };

}])
   
.controller('crearProductoCtrl', ['$scope', '$stateParams', 'productService',
	function ($scope, $stateParams, productService) {

    $scope.productCreate = function(_name, _type, _quantity, _price){

		var data = {
            "name": _name,
            "type": _type,
            "quantity": _quantity,
            "price": _price
        };

        productService.item_create.save(data, function(){
        	console.log(data);	
        });
    }

}])