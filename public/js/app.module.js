var app = angular.module('app', ['ui.router', 'appComponents', 'appControllers', 'appServices']);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");
    $urlRouterProvider.when('/main', '/main/');
    $urlRouterProvider.when('/server', '/server/dashboard');
    $urlRouterProvider.when('/main/setting', '/main/setting/general');

    // An array of state definitions
    var states = [
        {
            name: 'main',
            url: '/main',
            component: 'main'
        },
        {
            name: 'main.home',
            url: '/',
            component: 'home'
        },
        {
            name: 'main.about',
            url: '/about',
            component: 'about'
        },
        {
            name: 'main.products',
            url: '/products',
            component: 'products'
        },
        {
            name: 'main.viewProduct',
            url: '/viewProduct',
            component: 'viewProduct'
        },
        {
            name: 'login',
            url: '/login',
            component: 'login'
        },
        {
            name: 'server',
            url: '/server',
            component: 'server'
        },
        {
            name: 'server.dashboard',
            url: '/dashboard',
            component: 'svHome'
        },
        {
            name: 'server.newOrders',
            url: '/newOrders',
            component: 'svNewOrders'
        },
        {
            name: 'server.allSneakers',
            url: '/allSneakers',
            component: 'svAllSneakers'
        },
        {
            name: 'server.addSneakers',
            url: '/addSneakers',
            component: 'svAddSneakers'
        },
        {
            name: 'server.allAcces',
            url: '/allAccessories',
            component: 'svAllAcces'
        },
        {
            name: 'server.addAcces',
            url: '/addAccessories',
            component: 'svAddAcces'
        },
        {
            name: 'server.allOrders',
            url: '/allOrders',
            component: 'svAllOrders'
        }
    ];

    states.forEach((state) => {
      $stateProvider.state(state);
    });
  }
]);

$.loadScript('js/components.module.js');
