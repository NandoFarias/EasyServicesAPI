(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('loginController', loginController);

    loginController.$inject = ['Auth', '$state'];

    /* @ngInject */
    function loginController(Auth, $state) {
        var vm = this;


        activate();

        ////////////////

        function activate() {
            vm.user = {};
            vm.errors = {};
            vm.submitted = false;

            vm.login = login;
        }

        function login(form) {
            vm.submitted = true;

            if(form.$valid){
                Auth.login({
                    email: vm.user.email,
                    password: vm.user.password
                })
                .then(function() {
                    $state.go('main');
                })
                .catch(function(err) {
                    vm.errors.other = err.message;
                });
            }
        }
    }
})();
