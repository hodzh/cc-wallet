(function (window, angular) { 'use strict';

  angular.module('walleApp.ui')
      .factory('Modal', ['$rootScope', '$modal', Modal]);

  function Modal($rootScope, $modal) {

    return {
      /* Confirmation modals */
      confirm: {
        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: deleteModal
      }
    };

    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'modules/core/client/components/modal/index.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    /**
     * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
     * @param  {Function} del - callback, ran when delete is confirmed
     * @return {Function}     - the function to open the modal (ex. myModalFn)
     */
    function deleteModal(del) {
      del = del || angular.noop;

      return openDeleteConfirmation;

      /**
       * Open a delete confirmation modal
       * @param  {String} name   - name or info to show on modal
       * @param  {All}           - any additional args are passed straight to del callback
       */
      function openDeleteConfirmation() {
        var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            deleteModal;

        deleteModal = openModal({
          modal: {
            dismissable: true,
            title: 'Confirm Delete',
            html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
            buttons: [{
              classes: 'btn-danger',
              text: 'Delete',
              click: function(e) {
                deleteModal.close(e);
              }
            }, {
              classes: 'btn-default',
              text: 'Cancel',
              click: function(e) {
                deleteModal.dismiss(e);
              }
            }]
          }
        }, 'modal-danger');

        deleteModal.result.then(function(event) {
          del.apply(event, args);
        });
      }
    }
  }

})(window, window.angular);