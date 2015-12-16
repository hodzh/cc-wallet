(function (window, angular) { 'use strict';

    angular.module('stateMock', []);
    angular.module('stateMock').service('$state', ['$q', stateMock]);

    function stateMock($q) {
        var _this = this;

        _this.expectedTransitions = [];

        _this.transitionTo = transitionTo;
        _this.go = transitionTo;
        _this.expectTransitionTo = expectTransitionTo;
        _this.ensureAllTransitionsHappened = ensureAllTransitionsHappened;

        function transitionTo(stateName) {
            if (_this.expectedTransitions.length > 0) {
                var expectedState = _this.expectedTransitions.shift();
                if (expectedState !== stateName) {
                    throw Error('Expected transition to state: ' + expectedState + ' but transitioned to ' + stateName);
                }
            } else {
                throw Error('No more transitions were expected! Tried to transition to ' + stateName);
            }
            console.log('Mock transition to: ' + stateName);
            var deferred = $q.defer();
            var promise = deferred.promise;
            deferred.resolve();
            return promise;
        }

        function expectTransitionTo(stateName) {
            _this.expectedTransitions.push(stateName);
        }

        function ensureAllTransitionsHappened() {
            if (_this.expectedTransitions.length > 0) {
                throw Error('Not all transitions happened!');
            }
        }
    }

})(window, window.angular);
