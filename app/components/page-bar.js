export default Em.Component.extend({
  PER_PAGES:[
    {id:10,name:"10"},
    {id:25,name:"25"},
    {id:50,name:"50"},
    {id:100,name:"100"},
    {id:200,name:"200"}
  ],
  recordsStart: function(){
    return 1 + Number(this.get('pageContext.per_page')) * (Number(this.get('pageContext.page')) - 1);
  }.property('pageContext.page','pageContext.per_page'),
  recordsEnd: function(){
    var end = this.get('recordsStart') + Number(this.get('pageContext.per_page'));
    var tRows = this.get('pageContext.total_rows');
    return end < tRows ? (end-1) : tRows;
  }.property('recordsStart','pageContext.per_page'),
  isFirstPage: function(){
    return Number(this.get('pageContext.page')) === 1;
  }.property('pageContext.page'),
  isLastPage: Em.computed.not('pageContext.has_more_page'),
  actions : {
    gotoPrevPage(){
      if(!this.get('isFirstPage')){
        var pg = Number(this.get('pageContext.page'));
        var pp = Number(this.get('pageContext.per_page'));
        this.sendAction('gotoPageBar', (pg-1), pp);
      }
    },
    gotoFirstPage(){
      if(!this.get('isFirstPage')){
        var pg = Number(this.get('pageContext.page'));
        var pp = Number(this.get('pageContext.per_page'));
        this.sendAction('gotoPageBar', 1, pp);
      }
    },
    gotoNextPage(){
      if(!this.get('isLastPage')){
        var pg = Number(this.get('pageContext.page'));
        var pp = Number(this.get('pageContext.per_page'));
        this.sendAction('gotoPageBar', (pg+1), pp);
      }
    },
    gotoLastPage(){
      if(!this.get('isLastPage')){
        var pg = Number(this.get('pageContext.page'));
        var pp = Number(this.get('pageContext.per_page'));
        this.sendAction('gotoPageBar', this.get('recordsEnd'), pp);
      }
    },
    updatePerPage(){
      var pg = this.set('pageContext.page', 1);
      var pp = Number(this.get('pageContext.per_page'));
      this.sendAction('gotoPageBar', pg, pp);
    }
  }
});
