(function() {
    'use strict';
    angular
        .module('app.engineer')
        .controller('engineerSearchController', engineerSearchController);
    engineerSearchController.$inject = ['$log', 'engineerService', 'gmapsService', '$scope', '$rootScope', 'geolocation', 'positionDefault' ];
    /* @ngInject */
    function engineerSearchController($log, engineerService, gmapsService, $scope, $rootScope, geolocation, positionDefault ) {
        var vm = this;
        vm.title = 'engineerSearchController';
        vm.searchEngineers = searchEngineers;

        activate();
        ////////////////
        function activate() {

            vm.client = {};
            vm.client.latitude = positionDefault.latitude;
            vm.client.longitude = positionDefault.longitude;

            $rootScope.$on("clicked", function(){
                $scope.$apply(function(){
                    vm.client.latitude = parseFloat(gmapsService.clickLat).toFixed(6);
                    vm.client.longitude = parseFloat(gmapsService.clickLong).toFixed(6);
                });
            });

            getLocationHtml();

        }


        function getLocationHtml() {
            geolocation.getLocation().then(function(data){

                // Set the latitude and longitude equal to the HTML5 coordinates
                var coords = {lat:data.coords.latitude, long:data.coords.longitude};

                // Display coordinates in location textboxes rounded to three decimal points
                vm.client.longitude = parseFloat(coords.long).toFixed(6);
                vm.client.latitude = parseFloat(coords.lat).toFixed(6);

                // Display message confirming that the coordinates verified.
                vm.client.htmlverified = "Yep";

                gmapsService.refresh(vm.client.latitude, vm.client.longitude, {});

            },function(data) {
                $log.warn('Não foi possivel determinar a localização via htmlverified', data);
                vm.client.latitude = positionDefault.latitude;
                vm.client.longitude = positionDefault.longitude;
                gmapsService.refresh(vm.client.latitude, vm.client.longitude, {});

            });
        }

        function searchEngineers() {
            var searchData = {
                latitude: vm.client.latitude,
                longitude: vm.client.longitude,
                distance: vm.client.distance
            }
            engineerService.searchEngineers(searchData)
                .then(function(data) {
                    gmapsService.refresh(searchData.latitude, searchData.longitude, data);
                },function(data) {
                    $log.error('Não foi possivel buscar os prestadores da região', data);
                });
        }


    }
})();
