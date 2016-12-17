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

controllers.controller('ReservationsCtrl', ['OeuvresRest', '$location', function
(OeuvresRest,  $location) {
    var reservationsCtrl = this;
    // On référence les méthodes exposées
    var reservations = OeuvresRest.getReservations();
    /**
    * Déconnexion : isConnected passe à faux => le menu disparaîtra
    * On recharge la page principale
    */
    reservations.success(function (data) {
            if (data.length > 0) {
                reservationsCtrl.reservations = data;
            }
        }).error(function (data) { // Si la requête a provoqué une erreur (ex. 404)
            reservationsCtrl.error = data; // On affiche l'erreur brute,
            alert(reservationsCtrl.error);
        });
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
            var resultat = angular.fromJson(data);
            if(resultat !== null){
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

/**
* Pilote le listing des oeuvres
*/
controllers.controller('OeuvresCtrl', ['OeuvresRest', '$location', '$route', function(OeuvresRest, $location, $route) {
    var oeuvresCtrl = this;
    // Récupération de la promesse
    var oeuvresPromise = OeuvresRest.getOeuvres();
    oeuvresPromise.success(function (data) {
        if (data.length > 0) 
            oeuvresCtrl.oeuvres = data;
    }).error(function (data) {
        oeuvresCtrl.error = data; 
    });
}]);

controllers.controller('OeuvreCtrl', ['OeuvresRest', '$routeParams','$location', function (OeuvresRest, $routeParams, $location) {
        // Définition du scope
        var oeuvreCtrl = this;
        // On référence les méthodes exposées
        oeuvreCtrl.validateOeuvre = validateOeuvre;
        oeuvreCtrl.cancel = cancel;
	// On récupère l'id de l'employé
        oeuvreCtrl.pageTitle = 'une oeuvre';
        oeuvreCtrl.oeuvre_id = $routeParams.id;
	// Si l'id est défini, c'est modification
	// sinon ce sera un ajout
        if (oeuvreCtrl.oeuvre_id)
            oeuvreCtrl.pageTitle = 'Mise de à jour d\'' + oeuvreCtrl.pageTitle;
        else
            oeuvreCtrl.pageTitle = 'Ajout de d\'' + oeuvreCtrl.pageTitle;
        // Récupère la liste des departments
        OeuvresRest.getProprietaires().success(function (data) {
            oeuvreCtrl.proprietaires = data;
        });
        // S'il s'agit d'une demande de modification, il faut lire l'employé,
        // positionner les listes déroulantes (jobs et services) en fonction
        // des valeurs de l'employé
        if (oeuvreCtrl.oeuvre_id > 0) {
            var oeuvreR = OeuvresRest.getOeuvre($routeParams.id);
            oeuvreR.success(function (data, status) {
                if (status === 200) {
                    oeuvreCtrl.oeuvre = data;
                    oeuvreCtrl.selectedOptionProprietaire = oeuvreCtrl.oeuvre.proprietaire;
                }
            }).error(function (data) {
                oeuvreCtrl.error = data;
                alert(oeuvreCtrl.error);
            });
        }
        // On a cliqué sur le bouton Annuler
        function cancel() {
            $location.path('/getOeuvres');
        }
        /**
         * On a cliqué sur le bouton valider
         * @param {type} form : le formulaire complet
         */
        function validateOeuvre(form) {
            // Si tout a été saisi, pas de zone oubliée
            if (form.$valid) {             
                // On récupère l'objet employee dans le scope de la vue
                var oeuvre = oeuvreCtrl.oeuvre;
                // La marque décimale doit être le point
                oeuvre.titre = oeuvreCtrl.oeuvre.titre;
                // Récupération du service sélectionné
                oeuvre.prix = parseFloat(oeuvreCtrl.oeuvre.prix);
                // Récupération du job sélectionné
                oeuvre.id_proprietaire = oeuvreCtrl.selectedOptionProprietaire.id_proprietaire;
                // si on a un id => c'est une modification
                if (oeuvre.id_oeuvre) {
                    // Demande de mise à jour de l'employé
                    OeuvresRest.modifierOeuvre(oeuvre).success(function (data, status) {
                        // Si c'est OK on consulte la nouvelle liste des employés
                        // Sinon on affiche l'erreur
                        if (status === 200) {
                            $location.path('/getOeuvres');
                        }
                    }).error(function (data) {
                        oeuvreCtrl.error = data;
                        alert(oeuvreCtrl.error);
                    });
                }
                // Sinon c'est la création d'un nouvel employé
                else {
                    oeuvre.id_oeuvre = 0;
                    // Demande d'ajout de l'employé
                    OeuvresRest.ajouterOeuvre(oeuvre).success(function (data, status) {
                        // Si c'est OK on consulte la nouvelle liste des employés
                        // Sinon on affiche l'erreur
                        if (status === 200) {
                            $location.path('/getOeuvres');
                        }
                    }).error(function (data) {
                        oeuvreCtrl.error = data;
                        alert(oeuvreCtrl.error);
                    });
                }
        } else { // On affiche un message d'erreur type
            oeuvreCtrl.error = 'Erreur!';
        }
    }
 }]);