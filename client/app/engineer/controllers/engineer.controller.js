(function() {
    'use strict';

    angular
        .module('app.engineer')
        .controller('engineerController', engineerController);

    engineerController.$inject = ['geolocation', '$http', 'gmapsService', '$rootScope', '$scope', 'engineerService', '$log', 'positionDefault'];

    /* @ngInject */
    function engineerController(geolocation, $http, gmapsService, $rootScope, $scope, engineerService, $log, positionDefault) {
        var vm = this;
        vm.title = 'engineerController';
        vm.createEngineer = createEngineer;
        vm.getLocationHtml = getLocationHtml;

        activate();

        ////////////////

        function activate() {
        	vm.engineer = {};
        	vm.engineer.latitude = positionDefault.latitude;
        	vm.engineer.longitude = positionDefault.longitude;
             
            $rootScope.$on("clicked", function(){

                // Run the gservice functions associated with identifying coordinates
                $scope.$apply(function(){
                    vm.engineer.latitude = parseFloat(gmapsService.clickLat).toFixed(6);
                    vm.engineer.longitude = parseFloat(gmapsService.clickLong).toFixed(6);
                    vm.engineer.htmlverified = "Nope";
                });
            });

            getLocationHtml();

        }

        function getLocationHtml() {
            geolocation.getLocation().then(function(data){

                // Set the latitude and longitude equal to the HTML5 coordinates
                var coords = {lat:data.coords.latitude, long:data.coords.longitude};

                // Display coordinates in location textboxes rounded to three decimal points
                vm.engineer.longitude = parseFloat(coords.long).toFixed(6);
                vm.engineer.latitude = parseFloat(coords.lat).toFixed(6);

                // Display message confirming that the coordinates verified.
                vm.engineer.htmlverified = "Yep";

                gmapsService.refresh(vm.engineer.latitude, vm.engineer.longitude);

            },function(data) {
                $log.warn('Não foi possivel determinar a localização via htmlverified', data);
                vm.engineer.latitude = positionDefault.latitude;
                vm.engineer.longitude = positionDefault.longitude;
                gmapsService.refresh(vm.engineer.latitude, vm.engineer.longitude);

            });
        }


        function createEngineer() {
        	var engineer = {
        		username: vm.engineer.username,
        		skill: vm.engineer.skill,
        		location: [vm.engineer.longitude, vm.engineer.latitude],
        		htmlverified: vm.engineer.htmlverified
        	}
            engineerService.createEngineer(engineer)
                .then(function(data) {
                    vm.engineer.username = ""
                    vm.engineer.skill = ""

                    gmapsService.refresh(vm.engineer.latitude, vm.engineer.longitude);
                },function(data) {
                    $log.error('Não foi possivel determinar a localização via htmlverified', data)
                })
        }
    }
})();
