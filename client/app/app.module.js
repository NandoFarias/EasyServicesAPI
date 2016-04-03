(function() {
    'use strict';

    angular
        .module('app', [
            'app.engineer',
            'ui.router',
            'app.constants',
            'app.auth',
            'app.account',
            'app.main'
        ]);
})();
