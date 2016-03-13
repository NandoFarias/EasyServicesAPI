(function() {
    'use strict';

    angular
        .module('app', [
            'app.engineer',
            'ui.router'
        ])
        .constant("positionDefault", {
        "latitude": -23.605524,
        "longitude": -46.645287
    });
})();
