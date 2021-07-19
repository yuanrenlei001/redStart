const app = getApp();
Page({
  data: {
    user:''
  },
  onLoad(e) {
    let userInfo = JSON.parse(e.data).response;
    this.setData({
      user:userInfo
    })
    console.log(userInfo.gender)
  },
});
