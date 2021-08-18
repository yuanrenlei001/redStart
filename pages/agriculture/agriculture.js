const app = getApp()
Page({
  data: {},
  onLoad() {},
  gourl(){
    my.navigateTo({
      url: '/pages/web/web?url=https://gswsdj.zjzwfw.gov.cn/entrance_unite.html'
    });
  },
    gourl1(){
    my.navigateToMiniProgram({
      appId: '2018090361258298',  // 要跳转的目标小程序 appId。
      path: 'pages/index/index',  // 打开的页面路径，如果为空则打开首页。 
      extraData:{// 需要传递给目标小程序的数据，为键值对的格式，数值的类型为字符串。目标小程序可在 App.onLaunch() 、 App.onShow()  中获取到这份数据。
        "data1":"test"
      },
      success: (res) => {
        console.log(JSON.stringify(res))
      },
      fail: (res) => {
        console.log(JSON.stringify(res))
      },
      complete:(res) => {
           console.log(JSON.stringify(res))
      }
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
