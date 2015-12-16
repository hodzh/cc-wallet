(function (window, angular) { 'use strict';

    angular.module('walleApp.admin')
        .config(function($stateProvider) {
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'admin',
                    authenticate: 'admin'
                });
        });

})(window, window.angular);