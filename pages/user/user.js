const app = getApp();
Page({
  data: {
    user:'',
    textUser:''
  },
  onLoad() {
    this.login();
    this.onGetAuthorize();
  },
  login(){
    my.getAuthCode({
  scopes: ['auth_user'],
 // 主动授权：auth_user，静默授权：auth_base或者其它scope。如需同时获取用户多项授权，可在 scopes 中传入多个 scope 值。
  success: (res) => {
    console.log(res)
    // if (res.authCode) {
    //   my.alert({
    //   content: res.authCode,
    // });
    // }
  },
});
  },
  onGetAuthorize(res) {
  my.getOpenUserInfo({
    fail: (res) => {
  },
    success: (res) => {
      let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
      console.log(userInfo);
      this.setData({
        user:userInfo,
        textUser:res.response
      })
//       my.alert({
// content: userInfo});
        },
    });
},
});
