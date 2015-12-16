(function (window, angular) { 'use strict';

    angular.module('walleApp')
        .directive('oauthButtons', oauthButtons);

    function oauthButtons() {
        return {
            templateUrl: 'components/oauth-buttons/oauth-buttons.html',
            restrict: 'EA',
            controller: 'OauthButtonsCtrl',
            controllerAs: 'OauthButtons',
            scope: {
                classes: '@'
            }
        };
    }

})(window, window.angular);