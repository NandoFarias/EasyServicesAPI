(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('loginController', loginController);

    loginController.$inject = ['Auth', '$state'];

    /* @ngInject */
    function loginController(Auth, $state) {
        var vm = this;
        vm.title = 'loginController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();