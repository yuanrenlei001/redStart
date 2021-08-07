App({
  title: {
    index:'首页',
    user:'我的'
  },
  ajax:'https://sjyw.zhamengtec.com:8082',
  ajaxImg:'https://sjyw.zhamengtec.com:8082',
  userInfo:'',
  userContent:'',
  islogin:false,
  onLaunch(options) {
    
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },

  login(){
    var that =this;
        my.request({
      url: this.ajax+'/common/isLogin',
      method: 'post',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
          if(res.data.code==0){
            that.islogin = true
          }else{
            that.islogin =false
          }
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
});
