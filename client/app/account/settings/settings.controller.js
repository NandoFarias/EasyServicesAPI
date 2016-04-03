(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('settingsController', settingsController);

    settingsController.$inject = ['Auth'];

    /* @ngInject */
    function settingsController(Auth) {
        var vm = this;


        activate();

        ////////////////

        function activate() {
            vm.errors = {};
            vm.submitted = false;
            vm.changePassword = changePassword;
            vm.user = {};
            vm.message = '';
        }

        function changePassword(form) {
            vm.submitted = true;

            if(form.$valid){
                Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
                .then(function(){
                    vm.message = 'Senha trocada com sucesso';
                })
                .catch(function() {
                    form.password.$setValidity('mongoose', false);
                    vm.errors.other = 'Senha incorreta';
                    vm.message = '';
                })
            }
        }
    }
})();