angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('opciones', {
    url: '/page1',
    templateUrl: 'templates/opciones.html',
    controller: 'opcionesCtrl'
  })

  .state('menu.home', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html', //Lista de productos
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.cuenta', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cuenta.html',
        controller: 'cuentaCtrl'
      }
    }
  })

  .state('menu.editarPerfil', {
    url: '/page13/:email',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarPerfil.html',
        controller: 'editarPerfilCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('ingresar', {
    url: '/page4',
    templateUrl: 'templates/ingresar.html',
    controller: 'ingresarCtrl'
  })

  .state('menu.cambiarContraseA', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cambiarContraseA.html',
        controller: 'cambiarContraseACtrl'
      }
    }
  })

  .state('registrar', {
    url: '/page7',
    templateUrl: 'templates/registrar.html',
    controller: 'registrarCtrl'
  })

  .state('menu.producto', {
    url: '/page8/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/producto.html',  // Detalle del producto
        controller: 'productoCtrl'
      }
    }
  })

  .state('menu.editarProducto', {
    url: '/page9/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarProducto.html',
        controller: 'editarProductoCtrl'
      }
    }
  })

  .state('menu.crearProducto', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/crearProducto.html',
        controller: 'crearProductoCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1')

});