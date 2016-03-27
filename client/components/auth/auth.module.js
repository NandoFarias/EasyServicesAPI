(function() {
    'use strict';

    angular
        .module('app.auth', [
            'ngCookies',
            'ui.router'
        ])
        .config(function($httpProvider) {
    		$httpProvider.interceptors.push('authInterceptor');
  		});
})();