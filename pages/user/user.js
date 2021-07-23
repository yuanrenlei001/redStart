const app = getApp();
Page({
  data: {
    user:'',
    textUser:'',
    userContent:''
  },
  onLoad() {
    this.onGetAuthorize();
  },
  // logins(){

  // },
  login(){
    var that =this;
    my.getAuthCode({
  scopes: ['auth_user'],
 // 主动授权：auth_user，静默授权：auth_base或者其它scope。如需同时获取用户多项授权，可在 scopes 中传入多个 scope 值。
  success: (res) => {
    console.log(res)
    this.getInfo(res.authCode)
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
      this.login();
//       my.alert({
// content: userInfo});
        },
    });
},
// /vueApi/userSaveOrUpdate
// 支付宝API
getInfo(code){
  var that = this;
  my.request({
      url: app.ajax+'/vueApi/getInfo/?auth_code='+code,
      method: 'get',
      data: {},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        if(res.data.code==0){
            that.setData({
              userContent:res.data.data.response
            })
            that.userSaveOrUpdate();
        }
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
},
// 新增用户
userSaveOrUpdate(code){
  var that = this;
  function GetRandomNum(Min,Max)
{
var Range = Max - Min;
var Rand = Math.random();
return(Min + Math.round(Rand * Range));
}
var num = GetRandomNum(10000,999999);
  var data = {
  avatar:this.data.user.avatar,
  loginName:this.data.userContent.userId,
  sex:this.data.user.gender=='m'?'0':'1',
  userName:this.data.user.nickName,
  password:this.data.userContent.userId
}
console.log(data)
  my.request({
      url: app.ajax+'/vueApi/userSaveOrUpdate',
      method: 'post',
      data: data,
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        
        if(res.data.code == 0){
          console.log(12312312)
            that.logins();
        }
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
},
logins(){
    var data = {

  username:this.data.userContent.userId,
  password:this.data.userContent.userId
}
    my.request({
      url: app.ajax+'/vueApi/login?username='+this.data.userContent.userId+'&password='+this.data.userContent.userId,
      method: 'post',
      data:{},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        if(res.data.code == 0){

        }else{
          my.alert({content: res.data.msg});
        }
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
}
});
