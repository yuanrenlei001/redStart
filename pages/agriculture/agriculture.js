const app = getApp()
Page({
  data: {},
  onLoad() {},
  gourl(){
    my.navigateTo({
      url: '/pages/web/web?url=https://gswsdj.zjzwfw.gov.cn/entrance_unite.html'
    });
  },

  goUrls(e){
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
              my.navigateTo({
      url: e.target.dataset.url
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
