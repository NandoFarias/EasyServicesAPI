(function() {
    'use strict';

    angular
        .module('app.auth', [
            'ngCookies',
            'ui.router',
            'app.constants',
            'app.util',
            'ngResource'
        ])
        .config(function($httpProvider) {
    		$httpProvider.interceptors.push('authInterceptor');
  		});
})();
