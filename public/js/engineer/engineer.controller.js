(function() {
    'use strict';

    angular
        .module('app.engineer')
        .controller('engineerCtrl', engineerCtrl);

    engineerCtrl.$inject = ['geolocation', '$http', 'gmapsService'];

    /* @ngInject */
    function engineerCtrl(geolocation, $http, gmapsService) {
        var vm = this;
        vm.title = 'engineerCtrl';
        vm.createUser = createUser;

        activate();

        ////////////////

        function activate() {
        	vm.engineer = {};
        	vm.engineer.latitude = 39.500;
        	vm.engineer.longitude = -98.350;
        }

        function createUser() {
        	var engineer = {
        		username: vm.engineer.username,
        		skill: vm.engineer.skill,
        		location: [vm.engineer.longitude, vm.engineer.latitude],
        		htmlverified: vm.engineer.htmlverified
        	}

        	console.log(engineer);

        	$http.post('/engineers', engineer)
        		.success(function(data) {
        			vm.engineer.username = ""
        			vm.engineer.skill = ""

        			gmapsService.refresh(vm.engineer.latitude, vm.engineer.longitude);
        		})
        		.error(function(data) {
        			console.log("Error: " + data)
        		});
        }
    }
})();