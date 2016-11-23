'use strict';

var services = angular.module('services', []);
/**
 * Gestion de l'authentification
 */
services.factory('Connection', function () {
    // Expose la méthode getConnexion
    var connection = {
        getConnection: getConnection
    };
    return connection;
    // Vérifie les valeurs fournies
    // et retourne true ou false
    function getConnection(login, mdp) {
        
        var OK = false;
        if ((login === "admin") && (mdp === "mdp"))
            OK = true;
        return OK;
    }
});
/**
 * Définition des urls
 */
services.factory('Config', [function () {
        return {
            urlServer: 'http://localhost:8383/OeuvresRestFul/webresources/webservices',
            urlGetOeuvres: '/getOeuvres',
            urlGetOeuvre: '/getOeuvre/',
            urlSupprimerOeuvre: '/supprimerOeuvre/',
            
            urlGetProprietaires: '/getProprietaires',
            urlGetProprietaire: '/getProprietaire/',
            urlModifierProprietaire: '/modifierProprietaire/',
            urlAjouterProprietaire: '/ajouterProprietaire',
            
            urlGetReservations: '/getReservations',
            urlModifierReservations: '/modifierReservations',
            urlGetReservation: '/getReservation/',
            urlAjouterReservation: '/ajouterReservation',
            urlConfirmerReservation: '/confirmerReservation/',
            urlSupprimerReservation: '/supprimerReservation/',
            
            urlGetAdherents: '/getAdherents',
            urlGetConnecter: '/getConnecter/',
            
            urlAjouterOeuvre: '/ajouterOeuvre',
            urlModifierOeuvre: '/modifierOeuvre',
            urlAddEmployee: '/addEmployee',
            urlDeleteEmployee: '/deleteEmployee/'
        };
}]);

/**
* Gestion de l'accès aux données, utilise le
* service Config qui contient les urls du serveur RestFul.
* Chaque méthode exposée retourne une promise qui
* sera exploitée dans les contrôleurs
*/
services.factory('OeuvresRest', ['$http', 'Config',
function ($http, Config) {
    // Liste des méthodes exposées
    var oeuvresRest = {
        getConnecter: getConnecter
    };
    return oeuvresRest;
    
    function getConnecter(login, pwd) {
        return $http.get(Config.urlServer + Config.urlGetConnecter + login + '-' + pwd);
    }
}]);