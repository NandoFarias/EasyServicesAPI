(function() {
    'use strict';

    angular
    .module('app.engineer')
    .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/engineer/signup');
    }

    function getStates() {
        return [
            {
                state: 'signup', 
                config: {
                    url: '/engineer/signup',
                    templateUrl: 'engineer/views/signup.view.html',
                    controller: 'engineerController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'search',
                config:{
                    url: '/engineer/search',
                    templateUrl: 'engineer/views/search.view.html',
                    controller: 'engineerController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();