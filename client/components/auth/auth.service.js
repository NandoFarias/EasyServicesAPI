(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('Auth', AuthService);

    AuthService.$inject = ['$location', '$http', '$cookies', '$q', 'appConfig', 'Util', 'User'];

    /* @ngInject */
    function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    	var safeCb = Util.safeCb;
    	var currentUser = {};
    	var userRoles = appConfig.userRoles || [];

    	if($cookies.get('token') && $location.path() !== '/logout'){
    		currentUser = User.get();
    	}

        var service = {
            login: login,
            logout: logout,
            createUser: createUser,
            changePassword: changePassword,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            hasRole: hasRole,
            isAdmin: isAdmin,
            getToken: getToken
        };
        return service;

        ////////////////

        function login({email, password}, callback) {
        	
        }

        function logout() {
        	
        }

        function createUser(user, callback) {
        	
        }

        function changePassword(oldPassword, newPassword, callback) {
        	
        }

        function getCurrentUser(callback) {
        	
        }

        function isLoggedIn(callback) {
        	
        }

        function hasRole(role, callback) {
        	
        }

        function isAdmin() {
        	
        }

        function getToken() {
        		
        }
    }
})();