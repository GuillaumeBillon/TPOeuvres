'use strict';
/**
* Déclaration de la variable app qui sera utilisée après.
* Injection des modules externes (principalement Angular) et
* des modules internes (ceux qu'on a développés)
*/
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'controllers', 'services']);
/**
* Définition des constantes de configuration et injection des modules
* externes nécessaires : $routeProvider => routage
*/
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/home', {
                    templateUrl: 'partials/home.html'
                })
                .when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'ConnectionCtrl as connectionCtrl'
                })
                .when('/getOeuvres', {
                    templateUrl: 'partials/catalogue.html',
                    controller: 'OeuvresCtrl as oeuvresCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                });
    }]);

