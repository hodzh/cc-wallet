'use strict';

describe('Directive: oauthButtons', function() {

    var element, parentScope, elementScope;

    beforeEach(module('walleApp'));
    beforeEach(module('components/oauth-buttons/oauth-buttons.html'));

    beforeEach(inject(function($rootScope) {
        parentScope = $rootScope.$new();
    }));

    function copileDirective(template) {
        inject(function ($rootScope, $compile) {
            element = angular.element(template);
            element = $compile(element)(parentScope);
            parentScope.$digest();
            elementScope = element.isolateScope();
        });
    }

    it('should contain anchor buttons', function() {
        copileDirective('<oauth-buttons></oauth-buttons>');
        expect(element.find('a.btn.btn-social').length).toBeGreaterThan(0);
    });

    it('should evaluate and bind the classes attribute to scope.classes', function() {
        parentScope.scopedClass = 'scopedClass1';
        copileDirective('<oauth-buttons classes="testClass1 {{scopedClass}}"></oauth-buttons>');
        expect(elementScope.classes).toEqual('testClass1 scopedClass1');
    });

    it('should bind scope.classes to class names on the anchor buttons', function() {
        copileDirective('<oauth-buttons></oauth-buttons>');

        // Add classes
        elementScope.classes = 'testClass1 testClass2';
        elementScope.$digest();
        expect(element.find('a.btn.btn-social.testClass1.testClass2').length).toBeGreaterThan(0);

        // Remove classes
        elementScope.classes = '';
        elementScope.$digest();
        expect(element.find('a.btn.btn-social.testClass1.testClass2').length).toEqual(0);
    });
});
