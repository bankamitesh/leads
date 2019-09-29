export default Em.Controller.extend({
    queryParams:['city'],
    page: 1,
    per_page: 2,
    location_types: [
        {id:"City", name:"City"},
        {id:"State", name:"State"},
        {id:"Country", name:"Country"}
    ],
    search: "",
    _resourceRequest: function(params,resId) {
        var self = this;
        return jQuery.ajax(params).then(function(json){
            return json;
        });
    },
    onKeyPress : function() {
       this.send('applyFilters');
    }.observes('search'),
    actions: {
        applyFilters() {
            var input = this.get('search');
            var model = this.get('model');
            var newModel = [];
            model.forEach(function(item){
                for (var key in item) {
                    if (item[key] && item[key].toString().toUpperCase().indexOf(input.toUpperCase()) > -1)                               {
                        newModel.push(item);
                        break;
                    }
                }
            });
            this.set('newModel', newModel); 
            this.set('page',1); 
            this.send('applyPagination');
        },
        applyPagination(){
            var page = this.get('page');
            var per_page = this.get('per_page');
            var from = (page-1)*per_page;
            var to = page*per_page;
            var subArray = this.get('newModel').slice(from, to);
            var has_more_page = this.get('newModel').length > to ? 1 : 0; 
            var pageContext = {
                page : page,
                per_page: per_page,
                has_more_page: has_more_page,
                total_rows: this.get('newModel').length
            }
            this.set('pageContext', pageContext);
            this.set('leads',subArray);
        },
        markCommunication(){
            var data = this.get('communication');
            if(Em.isBlank(data)){
                this.set('errorMessages', ['Please fill all required details']);
                return;
            }
            this.set('errorMessages', []);
            var self = this;
            this._resourceRequest({url: 'http://localhost:8080/api/mark_lead/'+this.get('leadId'),data:{'communication':data},type:"PUT"}).then(function(){
                self.send('closeModal');
                self.send('refresh');
                self.send('showRequestMsg', "Communication Marked",1);
            }, function(){
                self.send('showRequestMsg', "Failed",0);
            })
        },
        addLeads(){
            this.setProperties({
                label: "Add Leads",
                modalId: 'add_dialog',
                modalData: {}
              });
              var options = {
               templatePath: 'addleads',
               cont: this
              };
              this.send('showModal',options);
        },
        update(id){
            this.setProperties({
                label: "Mark Communication",
                leadId: id
              });
              var options = {
               templatePath: 'mark',
               cont: this
              };
              this.send('showModal',options);
        },
        saveLead(){
            var data = this.get('modalData');
            if(Em.isBlank(data.first_name) || Em.isBlank(data.last_name) || Em.isBlank(data.email) || Em.isBlank(data.mobile) || Em.isBlank(data.location_type) || Em.isBlank(data.location_string)){
                this.set('errorMessages', ['Please fill all required details']);
                return;
            }
            this.set('errorMessages', []);
            var self = this;
            this._resourceRequest({url: 'http://localhost:8080/api/leads/',data:data,type:"POST"}).then(function(){
                self.send('closeModal');
                self.send('refresh');
                self.send('showRequestMsg', "Lead Added",1);
            }, function(){
                self.send('showRequestMsg', "Failed",0);
            })
        },
        showRequestMsg: function(msg, status){
            this.setProperties({
                messageClass: (status === 0 ? 'failure-msg' : 'success-msg'),
                requestMessage: msg
            });
            var div = $('#request-message');
            div.show();
            setTimeout(function() {
                div.fadeOut('slow');
            }, 3000);
        },
        delete(id){
            this.setProperties({
                'message': 'Do you confirm to delete?',
                'confirmParams': id,
                'confirmAction':'deleteLead',
            });
            this.send('showModal',{templatePath: 'confirm',cont: this});
        },
        deleteLead(id){
            var self=this;
            this._resourceRequest({url: 'http://localhost:8080/api/leads/'+id,type:"DELETE"}).then(function(){
                self.send('refresh');
                self.send('showRequestMsg', "Lead Deleted",1);
                self.send('closeModal');
            }, function(){
                self.send('showRequestMsg', "Failed",0);
            })
        },
        confirmed: function(){
          this.send(this.get('confirmAction'),this.get('confirmParams'));
        }
    }
});