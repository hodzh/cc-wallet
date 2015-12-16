(function (window, angular) { 'use strict';

    angular.module('walleApp')
        .controller('OauthButtonsCtrl', ['$window', OauthButtonsCtrl]);

    function OauthButtonsCtrl($window) {
        this.loginOauth = loginOauth;

        function loginOauth(provider) {
            $window.location.href = '/auth/' + provider;
        }
    }

})(window, window.angular);