const app = getApp();
Page({
  data: {
    content:'',
    id:''
  },
  onLoad(data) {
    this.detail(data.id)
    this.setData({
      id:data.id
    })
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
  add(){
    var that =this;
    my.request({
      url: app.ajax+'/vueApi/eventRecruitment/signUp/?id='+this.data.id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        my.showToast({
            content: '报名成功！',
            type: 'success',
            duration: 1000
          });
        // that.setData({
        //   content:res.data.data
        // })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  }
});
