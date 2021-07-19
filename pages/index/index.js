var app = getApp();
Page({
  data:{
    noticesList:'',
    farmingStudysList:''
  },
  onLoad(query) {
    // 页面加载
    this.notices();
    this.farmingStudys();
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
      fail: function(res) {
        my.alert({content: 'fail'});
      },
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
      fail: function(res) {
        my.alert({content: 'fail'});
      },
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
    // 页面加载完成
  },
  onShow() {
    let title = app.title.index;
    my.setNavigationBar({title});
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
