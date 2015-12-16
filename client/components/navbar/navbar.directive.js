(function (window, angular) { 'use strict';

    angular.module('walleApp')
        .directive('navbar', navbar);

    function navbar() {
        return {
            templateUrl: 'components/navbar/navbar.html',
            restrict: 'E',
            controller: 'NavbarController',
            controllerAs: 'nav'
        }
    }

})(window, window.angular);