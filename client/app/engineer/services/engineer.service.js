(function() {
    'use strict';
    angular
        .module('app.engineer')
        .factory('engineerService', engineerService);
    engineerService.$inject = ['$http', '$q', '$log'];
    /* @ngInject */
    function engineerService($http, $q, $log) {
        var service = {
            getEngineers: getEngineers,
            createEngineer: createEngineer
        };
        return service;
        ////////////////
        function getEngineers() {
            var deferred = $q.defer();
            $http.get('/api/engineers').success(function(data){
                    deferred.resolve(data);
               }).error(function(msg, code){
                    deferred.reject(msg);
                    $log.error(msg, code);
               });
               return deferred.promise;
        }

        function createEngineer(engineer) {
            var deferred = $q.defer();
            $http.post('/api/engineers', engineer)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });1

            return deferred.promise;
        }
    }
})();
