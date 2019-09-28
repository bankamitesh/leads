export default Ember.Component.extend({
    keyboard: true,
    backdrop: 'static',
    headerCloseReq: true,
    closeModal:function(){
      var cma = this.get('closeModalAction');
      return cma ? cma : 'closeModal';
    }.property('closeModalAction'),
    showModal: function(){
      var str = '.modal.nu-modal';
      $(str).modal({
          backdrop: this.get('backdrop'),
          keyboard: this.get('keyboard')
      });
    }.on('didInsertElement'),
    isHeaderReq: true,
    actions:{
      closeModal: function(){
        this.sendAction('closeModal');
      }
    }
});
