angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.opciones', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/opciones.html',
        controller: 'opcionesCtrl'
      }
    }
  })

  .state('menu.home', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
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
    url: '/page13',
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

  .state('menu.ingresar', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ingresar.html',
        controller: 'ingresarCtrl'
      }
    }
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

  .state('menu.registrar', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/registrar.html',
        controller: 'registrarCtrl'
      }
    }
  })

  .state('menu.producto', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/producto.html',
        controller: 'productoCtrl'
      }
    }
  })

  .state('menu.editarProducto', {
    url: '/page9',
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

$urlRouterProvider.otherwise('/side-menu21/page2')

  

});