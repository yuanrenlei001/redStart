const app = getApp();
Page({
  data: {
    detail:'',
    img:app.ajaxImg,
    text:''
  },
  onLoad(e) {
    console.log(e)
    this.notices(e.id,e.url) 
  },
  
  // onlineStudy/{id}
    notices(id,url){
    var that = this;
    var text = ''
        my.request({
      url: app.ajax+'/vueApi/'+url+'/'+id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data;
        text = data.content;
        that.setData({
          detail:data,
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
   
  },
  
});
