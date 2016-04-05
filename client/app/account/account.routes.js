(function() {
    'use strict';

    angular
    .module('app.account')
    .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, $rootScope) {
        routerHelper.configureStates(getStates());
        $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.authenticate) {
                next.referrer = current.name;
            }
        });
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/account/login',
                    templateUrl: 'app/account/login/login.html',
                    controller: 'loginController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'logout',
                config: {
                    url: '/account/logout',
                    referrer: 'main',
                    template: '',
                    controller: function($state, Auth) {
                        var referrer = $state.params.referrer ||
                                        $state.current.referrer ||
                                        'main';
                        Auth.logout();
                        $state.go(referrer);
                    }
                }
            },
            {
                state: 'signup',
                config: {
                    url: '/account/signup',
                    templateUrl: 'app/account/signup/signup.html',
                    controller: 'signupController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'settings',
                config:{
                    url: '/account/settings',
                    templateUrl: 'app/account/settings/settings.html',
                    controller: 'settingsController',
                    controllerAs: 'vm',
                    authenticate: true
                }
            }
        ];
    }

})();
