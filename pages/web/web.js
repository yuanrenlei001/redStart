const app = getApp();
Page({
  data: {
    url:''
  },
  onLoad(query) {
    console.log(query)
    this.setData({
      url:query.url
    })
  },
});
