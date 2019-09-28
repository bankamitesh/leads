export default Em.Controller.extend({
    queryParams:['city'],
    page: 1,
    per_page: 25,
    search: "",
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
        addLeads(){
            this.setProperties({
                label: "Add Leads"
              });
              var options = {
               templatePath: 'addleads',
               cont: this
              };
              this.send('showModal',options);
        }
    }
  });