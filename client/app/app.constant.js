(function() {
    'use strict';
    angular
        .module('app.constants', [])
        .constant('appConfig', {userRoles:['guest','user','admin']})
        .constant("positionDefault", { "latitude": -23.605524, "longitude": -46.645287 });
})();
