export default Em.Component.extend({
    tagName: "tr",
    actions:{
        delete(){
            this.sendAction('delete', this.get('lead.id'));
        },
        update(){
            this.sendAction('update', this.get('lead.id'));
        }
    }
})