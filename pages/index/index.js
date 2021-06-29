var app = getApp();
Page({
  onLoad(query) {
    // 页面加载
    
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
