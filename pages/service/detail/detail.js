const app = getApp();
Page({
  data: {
    id:'',
    detail:''
  },
  onLoad(query) {
    this.setData({
      id:query.id
    })
    this.notices();
  },
    notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/policyInfo/'+this.data.id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data;
        that.setData({
          detail:data
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
});
