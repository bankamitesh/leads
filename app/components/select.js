export default Ember.Component.extend({
    content: null,
    selectedValue: null,
    prompt: 'Select',
    attributeBindings:['name'],
    showAddNew: false,
    isFormControl: true,
    didInitAttrs() {
      this._super(...arguments);
      var content = this.get('content');
  
      if (!content) {
        this.set('content', []);
      }
    },
    optionLabelPath: 'name',
    optionValuePath: 'id',
    actions: {
      change() {
        //const changeAction = this.get('action');
        var selectedValue;
  
        const selectedEl = this.$('select')[0];
        var selectedIndex = selectedEl.selectedIndex;
        var content = this.get('content') || [];
        var self = this;
        selectedIndex = selectedIndex -1;
        selectedValue = selectedIndex >= 0 ? content[selectedIndex] : {};
  
        this.set('selectedValue', Em.get(selectedValue, this.get('optionValuePath')));
        //changeAction(selectedValue);
  
        if(this.get('on-change')){
          this.sendAction('on-change', selectedValue, this.get('params'));
        }
      }
    }
  });
  