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
            urlServer: 'http://localhost:8080/OeuvresRestFul/webresources/webservices',
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
            urlGetConnecter: '/getConnexion/',
            
            urlAjouterOeuvre: '/ajouterOeuvre',
            urlModifierOeuvre: '/modifierOeuvre',
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
        getConnecter: getConnecter,
        getOeuvres : getOeuvres,
        getReservations: getReservations,
        ajouterOeuvre : ajouterOeuvre,
        getProprietaires : getProprietaires,
        getOeuvre : getOeuvre,
        modifierOeuvre: modifierOeuvre
    };
    return oeuvresRest;
    
    function getConnecter(login, pwd) {
        return $http.get(Config.urlServer + Config.urlGetConnecter + login);
    }
    function getReservations() {
        return $http.get(Config.urlServer + Config.urlGetReservations);
    }
    function getOeuvres() {
        return $http.get(Config.urlServer + Config.urlGetOeuvres);
    }
    function ajouterOeuvre(oeuvre) {
        return $http.post(Config.urlServer + Config.urlAjouterOeuvre, oeuvre);
    }
    function getProprietaires() {
        return $http.get(Config.urlServer + Config.urlGetProprietaires);
    }
    function getOeuvre(id){
        return $http.get(Config.urlServer + Config.urlGetOeuvre + id);
    }
    function modifierOeuvre(oeuvre) {
        var url = Config.urlServer + Config.urlModifierOeuvre;
        return $http.post(url, oeuvre);
    }
}]);