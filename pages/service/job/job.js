Page({
  data: {
    type:1
  },
  onLoad() {},
  active(e){
    this.setData({
      type:e.target.targetDataset.type
    })
  },
  goUrl(){
    my.navigateTo({
      url: '/pages/activity/activityYy/activityYy'
    });
  }
});
