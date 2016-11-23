'use strict';
/**
* Déclaration du module controllers qui rassemblera
* tous les contrôleurs
*/
var controllers = angular.module('controllers', []);

/**
* Pilote la déconnexion
*/
controllers.controller('MainCtrl', ['$rootScope', '$location', function
($rootScope,  $location) {
    var mainCtrl = this;
    // On référence les méthodes exposées
    mainCtrl.disConnect = disConnect;
    // Par defaut on n'est pas autentifié
    $rootScope.isConnected = false;
    /**
    * Déconnexion : isConnected passe à faux => le menu disparaîtra
    * On recharge la page principale
    */
    function disConnect() {
        $rootScope.isConnected = false;
        $location.path('/home');
    }
}]);

/**
* Contrôleur de la page connect.html qui
* permet de s'authentifier et d'accéder aux
* fonctionnalités
*/
controllers.controller('ConnectionCtrl', ['$rootScope', 'OeuvresRest',
'$location', '$filter', function ($rootScope, OeuvresRest, $location, $filter) {
    var connectionCtrl = this;
    // On référence les méthodes exposées
    connectionCtrl.signIn = signIn;
    connectionCtrl.login = "";
    connectionCtrl.pwd = "";
    /**
    * Appelle le service Connection avec le login
    * et le pwd. Si Ok redirige vers la page d'accueil
    * sinon affiche un message d'erreur dans la langue en cours
    * @param login
    * @param pwd
    */
    function signIn(login, pwd) {
        connectionCtrl.error = "";
        var estConnecter = OeuvresRest.getConnecter(login, pwd);
        estConnecter.success(function (data) {
            if(data.length > 0){
                $rootScope.isConnected = estConnecter;
                $location.path('/home');
            }
            else {
                connectionCtrl.error = 'Login ou mot de passe erronné !';
            }
        }).error(function (data){
            connectionCtrl.error = 'Login ou mot de passe erronné !';
        });
    }
}]);