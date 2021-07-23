App({
  title: {
    index:'首页',
    user:'我的'
  },
  ajax:'http://42.194.242.144/redStar',
  ajaxImg:'http://42.194.242.144/redStar',
  onLaunch(options) {
    
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
