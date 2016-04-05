(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('signupController', signupController);

    signupController.$inject = ['Auth', '$state'];

    /* @ngInject */
    function signupController(Auth, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.user = {};
            vm.errors = {};
            vm.submitted = false;
            vm.register = register;
        }


        function register(form) {
            vm.submitted = true;

            if(form.$valid){
                Auth.createUser({
                    name: vm.user.name,
                    email: vm.user.email,
                    password: vm.user.password
                })
                .then(function() {
                    $state.go('main');
                })
                .catch(function(err) {
                    err = err.data;
                    angular.forEach(err.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        vm.errors[field] = error.message;
                    });
                });
            }
        }
    }
})();
