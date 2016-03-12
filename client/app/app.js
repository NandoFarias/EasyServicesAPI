(function() {
    'use strict';

    angular
        .module('app', [
            'app.engineer'
        ])
        .constant("positionDefault", {
        "latitude": -23.605524,
        "longitude": -46.645287
    });
})();
