const app = getApp();
Page({
  data: {
    content:''
  },
  onLoad(data) {
    this.detail(data.id)
  },
  detail(id){
      var that =this;
    my.request({
      url: app.ajax+'/vueApi/eventRecruitment/'+id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.setData({
          content:res.data.data
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  add(){}
});
