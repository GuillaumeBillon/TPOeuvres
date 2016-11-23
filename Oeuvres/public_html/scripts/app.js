'use strict';

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'controllers', 'services', 'directives']);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/home', {
                    templateUrl: 'partials/home.html'
                })
                .when('/connect', {
                    templateUrl: 'partials/connect.html',
                    controller: 'ConnectionCtrl as connectionCtrl'
                })
                .when('/getOeuvres', {
                    templateUrl: 'partials/oeuvres.html',
                    controller: 'OeuvresCtrl as OeuvresCtrl'
                })
                .when('/updateOeuvre/:id', {
                    templateUrl: 'partials/oeuvre.html',
                    controller: 'OeuvreCtrl as OeuvreCtrl'
                })
                .when('/addOeuvre', {
                    templateUrl: 'partials/oeuvre.html',
                    controller: 'OeuvreCtrl as OeuvreCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                });
    }]);

