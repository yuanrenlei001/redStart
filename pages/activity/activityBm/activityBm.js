const app = getApp();
Page({
  data: {
    content:'',
    banner:[],
    img:app.ajaxImg,
    id:''
  },
  onLoad(data) {
    this.setData({
      id:data.id
    })
  },
  onShow(){
    this.detail(this.data.id)
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
          content:res.data.data,
           banner:res.data.data.coverImgInfo
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
      url: app.ajax+'/common/isLogin',
      method: 'post',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
          if(res.data.code==0){
                my.request({
      url: app.ajax+'/vueApi/eventRecruitment/signUp/?id='+that.data.id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json',
        'ajaxHeader':'ajaxHeader'
      },
      dataType: 'json',
      success: function(res) {
         
               my.showToast({
            content: '报名成功！',
            type: 'success',
            duration: 1000
          });
          that.detail(that.data.id)

      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
          }else{
            my.navigateTo({
              url: '/pages/getAuthorize/getAuthorize'
            });
         
          }
      },
    }); 

  }
});
