(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('signupController', signupController);

    signupController.$inject = ['Auth', '$state'];

    /* @ngInject */
    function signupController(Auth, $state) {
        var vm = this;
        vm.title = 'signupController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();