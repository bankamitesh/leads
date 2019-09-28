var get = Em.get;
export default Ember.Route.extend({
  _resourceRequest: function(params,resId) {
      var self = this;
      return jQuery.ajax(params).then(function(json){
          return json;
      }, function(err, textStatus){
          $('.scrollable').scrollTop(0);
          $('.modal').scrollTop(0);
          return self.prepareErrResp(err, textStatus, params);
      });
  },
  model(params) {
      return Em.RSVP.hash({
          resources: this._resourceRequest({url: 'http://localhost:8080/api/leads/'}),
      });
  },
  setupController: function(controller, context){
      controller.set('model', context.resources);
      controller.set('search', "");
      controller.set('newModel', context.resources);
      controller.set('page', 1);
      controller.send('applyPagination');
  },
  actions: {
    refresh: function(){
      this.refresh();
    },
    gotoPageBar(page, perPage){
        this.get('controller').setProperties({
            page:page,
            per_page: perPage,
        });
        this.get('controller').send('applyPagination');
    },
    closeModal: function () {
      $('.modal').modal('hide');
      $('.modal-backdrop').remove();
      this.send('discon');
    },
    discon: function () {
        return this.disconnectOutlet({
            outlet: 'modal',
            parentView: 'application'
        });
    },
    showModal: function (options) {
        this.render(get(options, 'templatePath'), {
            into: 'application',
            outlet: 'modal',
            controller: get(options, 'cont')
        });
        $('.modal.nu-modal').modal('show');
    }
  }
});