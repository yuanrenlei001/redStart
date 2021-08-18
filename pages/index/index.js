var app = getApp();
Page({
  data:{
    noticesList:'',
    farmingStudysList:'',
    img:app.ajaxImg,
    banner:[]
  },
  onLoad(query) {
    // 页面加载
    
  },
  banners(){
    var that = this;
    console.log(app.ajax+'/vueApi/banners?pageNum=1&pageSize=10')
        my.request({
      url: app.ajax+'/vueApi/banners?pageNum=1&pageSize=10',
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
          banner:data
        })
      },
      // fail: function(res) {
      //   my.alert({content: 'fail'});
      // },
    });
  },
  goUrlNews(){
    my.navigateTo({
      url: '/pages/notice/notice'
    });
  },
  notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/notices?pageNum=1&pageSize=2',
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data.result;
        that.setData({
          noticesList:data
        })
      },
      // fail: function(res) {
      //   my.alert({content: 'fail'});
      // },
    });
  },
  farmingStudys(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/farmingStudys?pageNum=1&pageSize=2&studyType=0',
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data.result;
        that.setData({
          farmingStudysList:data
        })
      },
      // fail: function(res) {
      //   my.alert({content: 'fail'});
      // },
    });
  },
  getAuthCode(){
      my.getAuthCode({
  scopes: 'auth_user',
  success: (res) => {
    console.log(res)
  },
});
  },

  onReady() {

  },
  getAvailableAudioSources() {
    my.getAvailableAudioSources(
      {
        success: function(res) {
          my.alert({ content: "success" + JSON.stringify(res)});
          console.log("getAvailableAudioSources success" + JSON.stringify(res));
        },
        fail: function(res) {
          my.alert({content : "fail"});
          console.log("getAvailableAudioSources fail" + JSON.stringify(res));
          if (res) {
            console.log("getAvailableAudioSources fail" + JSON.stringify(res));
          }
        },
        complete: function(res) {
          my.alert({ content: "complete" });
          console.log("getAvailableAudioSources complete" + JSON.stringnify(res));
          if(res) {
            console.log("getAvailableAudioSources complete" + JSON.stringnify(res));
          }
        },
      }
    )
  },
  audioPlay(){
    this.backgroundAudioManager.play();
    console.log("call backgroundAudioManager.play");
    my.alert({ content: "call backgroundAudioManager.play" });
  },

  onShow() {
    let title = app.title.index;
    my.setNavigationBar({title});
    this.notices();
    this.farmingStudys();
    this.banners();
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: app.tit1le.index,
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  
});
