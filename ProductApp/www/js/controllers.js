angular.module('app.controllers', ['app.services', 'ngCordova'])
     
.controller('homeCtrl', ['$scope', '$stateParams', 'productService', '$cordovaSQLite',
	function ($scope, $stateParams, productService, $cordovaSQLite) {

		$scope.getProductList = function(){
			var db = $cordovaSQLite.openDB({ name: "ProductApp.db", location:'default' });
			var create_table = 'CREATE TABLE IF NOT EXISTS producto (id, name, type, quantity, price)';
      		var insert_table = "INSERT INTO producto (id, name, type, quantity, price) VALUES (?,?,?,?,?);";
      		var select_table = "SELECT id, name, type, quantity, price from producto ORDER BY id";
      		var delete_table = "DELETE from producto";

  			// Crear Tabla
	      	$cordovaSQLite.execute(db, create_table, []).then(function(res){
	        	console.log("Tabla producto creada");
	      	}, 
	      	function(err){
	        	console.error("Error create table: " + err);
	      	});

	      	// Eliminar registros
	      	$cordovaSQLite.execute(db, delete_table, []).then(function(res){
	        	console.log("Registros eliminados");
	      	}, 
	      	function(err){
	        	console.error("Error eliminar registro: " + err);
	      	});

	      	productService.item_list.query(function(data){
				//$scope.list = data;

		      	for (var item in data) {
		      		// Insertar Tabla
	      			$cordovaSQLite.execute(db, insert_table, [ data[item].id, data[item].name, data[item].type, data[item].quantity, data[item].price] ).then(function(res){
	        			console.log("Dato insertado");
	      			}, function(err){
		        		console.error("Error insert table: " + err);
	      			});
		      	}

				// Select Tabla
		      	$cordovaSQLite.execute(db, select_table).then(function(res){
		        	
		        	console.log("select table");
		        	console.log("Cantidad de registros: " + res.rows.length);
		        	
		        	//$scope.list = res.rows.item;
		        	//console.log($scope.list);

		        	var listInt = [];
		        	for (var i = 0; i < res.rows.length; i++) {
		        		listInt.push(res.rows.item(i));
		        		//console.log("Nombre:" + res.rows.item(i).name);
		        	}

		        	$scope.list = listInt;

		      	}, 
		      	function(err){
		        	console.error("Error select table: " + err);
		      	});
	      	});

		}
	
		$scope.getProductDetail = function(_id){
			$stateParams.id = _id;
		}

	} // fin function
])

.controller('productoCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

		var _id = $stateParams.id;

		$scope.doRefresh = function() {
        	_id = $stateParams.id; 
		    productService.item_detail.get({id: _id}, function(data){
				$scope.detail = data;
				console.log("Producto cargado id: " + _id);
		    });
        }

		productService.item_detail.get({id: _id}, function(data){
			$scope.detail = data;
			console.log("Producto cargado id: " + _id);
		});

		$scope.productDelete = function(){
			console.log("Producto a eliminar id: " + _id);

			// Dialog Confirm
			$cordovaDialogs.confirm('Desea eliminar el producto: ', 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) {
		      		if (buttonIndex == 1) { // no button = 0, 'OK' = 1, 'Cancel' = 2
		      			productService.item_delete.delete({id:_id});
    					$cordovaDialogs.alert('Producto eliminado', 'Alert', 'Ok').then();
    					$state.go('menu.home');
		      		}
    			}
		    ); // fin dialog

		} // fin productDelete
	} // fin function
])

.controller('editarProductoCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

		var _id = $stateParams.id;
		productService.item_detail.get({id: _id}, function(data){
			$scope.detail = data;
			console.log("Producto a editar id: " + _id);
		});

	    $scope.productUpdate = function(_inputName, _inputType, _inputQuantity,  _inputPrice)
	    {

			var data = { 
			  	"name": _inputName,
		      	"type": _inputType,
		       	"quantity": _inputQuantity,
		       	"price": _inputPrice
			};
			
			// Dialog Confirm
			$cordovaDialogs.confirm('Confirma el cambio de producto Id : ' + _id , 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) { 
	      			if (buttonIndex == 1) { // no button = 0, 'OK' = 1, 'Cancel' = 2
	      				productService.item_update.update({id: _id}, data, function(data){
	    					$scope.detail = data;
	    					$cordovaDialogs.alert('Producto actualizado', 'Alert', 'Ok').then();
	    					$state.go('menu.editarProducto');
						});
	      			} // fin if buttonIndex
				}
		    ); // fin dialog

	  	}; // fin productUpdate

	} // fin function
])
   
.controller('crearProductoCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

	    $scope.productCreate = function(_name, _type, _quantity, _price){

			var data = {
	            "name": _name,
	            "type": _type,
	            "quantity": _quantity,
	            "price": _price
	        };

	        // Dialog Confirm
			$cordovaDialogs.confirm('Confirma la creación del producto: ', 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) {
		      		if (buttonIndex == 1) { // no button = 0, 'OK' = 1, 'Cancel' = 2
		      			productService.item_create.save(data, function(){
	        				$cordovaDialogs.alert('Producto creado', 'Alert', 'Ok').then();
	        				$state.go('menu.home');
	        			});
		      		}
    			}
		    ); // fin dialog
	    }
	}
])


.controller('registrarCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

		$scope.userCreate = function(_email, _firstname, _lastname, _phone, _password) {

			var data = {
				"email": _email,
				"firstname": _firstname,
				"lastname": _lastname,
				"phone": _phone,
				"password": _password
			};

			// Dialog Confirm
			$cordovaDialogs.confirm('Confirma la creación del usuario: ', 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) {
		      		if (buttonIndex == 1) { // no button = 0, 'OK' = 1, 'Cancel' = 2
		      			productService.user_create.save(data, function(){
                            localStorage.setItem('Email', _email);
							$cordovaDialogs.alert('Bienvenido', 'Alert', 'Ok').then();
							$state.go('menu.home');
						});
		      		}
    			}
		    ); // fin dialog
		}
	}
])

.controller('ingresarCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

		$scope.userLogin = function(_email, _password) {

			var data = {
				"email": _email,
				"password": _password
			};

			productService.user_login.login(data, function(data) {
	            console.log("Data Id :" + data.id);

	            if (data.id != null) {
					localStorage.setItem('Email', _email);
					console.log("localStorage :" + _email);
					$cordovaDialogs.alert('Bienvenido', 'Alert', 'Ok').then();
					$state.go('menu.home');
				}
				else
				{
					$cordovaDialogs.alert('Nombre de usuario o contraseña incorrecta', 'Alert', 'Ok').then();
					$state.go('ingresar');
					localStorage.clear();
				}
			});

		}
	}
])
      
.controller('cambiarContraseACtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

		$scope.userForgotPassword = function(_email, _password) {

			var data = {
				"password": _password
			};

			productService.user_forgotpassword.forgot({email: _email}, data, function(data){
				console.log("data: " + data);
				$cordovaDialogs.alert('Confirmar cambio contraseña', 'Alert', 'Ok').then();
				$state.go('menu.home');
			});

		}
	}
])
   
.controller('editarPerfilCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

		console.log("Inicio Editar Perfil Ctrl");

		var _email = $stateParams.email;
		productService.user_detail.get({email: _email}, function(data){
			$scope.detail = data;
			console.log("Usuario a editar email: " + _email);
		});

	    $scope.userUpdate = function(_firstname, _lastname, _phone)
	    {
			var data = { 
				"firstname": _firstname,
		      	"lastname": _lastname,
		       	"phone": _phone
			};
			
			// Dialog Confirm
			$cordovaDialogs.confirm('Confirma el cambio del usuario: ' + _email , 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) { 
	      			if (buttonIndex == 1) { // no button = 0, 'OK' = 1, 'Cancel' = 2
	      				productService.user_edit.update({email: _email}, data, function(data){             //productService.user_edit.update({email: _email}, function(data){
	    					$scope.detail = data;
	    					$cordovaDialogs.alert('Usuario actualizado', 'Alert', 'Ok').then();
	    					$state.go('menu.cuenta');
						});
	      			} // fin if buttonIndex
				} 
		    ); // fin dialog

	  	}; // fin productUpdate

	} // fin function
])
   
.controller('cuentaCtrl', ['$scope', '$stateParams', 'productService', '$cordovaDialogs', '$state',
	function ($scope, $stateParams, productService, $cordovaDialogs, $state) {

        console.log("Inicio Ctrl Cuenta");
        
		var _email = localStorage.getItem('Email'); //$stateParams.id; 
		console.log("Inicio Cuenta id: " + _email);

		 $scope.doRefresh = function() {
            _email = localStorage.getItem('Email'); //$stateParams.id; 
            console.log(_email);
            
            productService.user_detail.get({email: _email}, function(data){
				$scope.detail = data;
			 	console.log("Usuario cargado email: " + _email);
			});
        };
		
		productService.user_detail.get({email: _email}, function(data){
			$scope.detail = data;
			console.log("Usuario cargado email: " + _email);
		});

		$scope.userDelete = function(){
			console.log("Usuario a eliminar email: " + _email);

			// Dialog Confirm
			$cordovaDialogs.confirm('Desea eliminar el usuario: ', 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) {
		      		if (buttonIndex == 1) { // no button = 0, 'OK' = 1, 'Cancel' = 2
		      			productService.user_delete.delete({email:_email});
    					$cordovaDialogs.alert('Usuario eliminado', 'Alert', 'Ok').then();
    					localStorage.clear();
                        $state.go('opciones');
                        
		      		}
    			}
		    ); // fin dialog

		} // fin userDelete

		$scope.userClose = function(){
			console.log("Usuario a cerrar sesion id: " + _email);

			// Dialog Confirm
			$cordovaDialogs.confirm('Confirma cerrar la sesion : ', 'Continuar', ['Si', 'No'] ).then(
				function(buttonIndex) {
		      		if (buttonIndex == 1) { // no button = 0, 'OK' = 1, 'Cancel' = 2
		      			$cordovaDialogs.alert('Sesion cerrada', 'Alert', 'Ok').then();
                        localStorage.clear();
                        $state.go('opciones');
		      		}
    			}
		    ); // fin dialog

		} // fin cerrar sesion


	} // fin function
])

.controller('opcionesCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

}])