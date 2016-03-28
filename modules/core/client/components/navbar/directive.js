(function (window, angular) { 'use strict';

    angular.module('walleApp')
        .directive('navbar', navbar);

    function navbar() {
        return {
            templateUrl: 'modules/core/client/components/navbar/index.html',
            restrict: 'E',
            controller: 'NavbarController',
            controllerAs: 'nav'
        }
    }

})(window, window.angular);