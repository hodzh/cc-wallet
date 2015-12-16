(function (window, angular) { 'use strict';

    angular.module('walleApp')
        .controller('MainController', ['$http', '$scope', MainController]);

    function MainController($http, $scope) {
        var _this = this;
        _this.$http = $http;
        _this.awesomeThings = [];

        $http.get('/api/things').then(function(response) {
            _this.awesomeThings = response.data;
        });

        _this.addThing = function(){
            if (_this.newThing) {
                _this.$http.post('/api/things', { name: _this.newThing });
                _this.newThing = '';
            }
        };

        _this.deleteThing = function(thing) {
            _this.$http.delete('/api/things/' + thing._id);
        };
    }

})(window, window.angular);