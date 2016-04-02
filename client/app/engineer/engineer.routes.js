(function() {
    'use strict';

    angular
    .module('app.engineer')
    .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'signup',
                config: {
                    url: '/engineer/signup',
                    templateUrl: 'app/engineer/views/signup.view.html',
                    controller: 'engineerSignupController',
                    controllerAs: 'vm',
                    authenticate: 'admin'
                }
            },
            {
                state: 'search',
                config:{
                    url: '/engineer/search',
                    templateUrl: 'app/engineer/views/search.view.html',
                    controller: 'engineerSearchController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
