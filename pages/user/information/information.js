const app = getApp();
Page({
  data: {
    user:''
  },
  onLoad(e) {
    var that = this;
    my.getStorage({
  key: 'userInfo',
  success: function(res) {
     that.setData({
      user:res.data
    })
  },
  
});
  
    // let userInfo = JSON.parse(e.data).response;
    // this.setData({
    //   user:userInfo
    // })
    console.log(this.data.user)
  },
});
