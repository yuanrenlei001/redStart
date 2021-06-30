Page({
  data: {
    type:2
  },
  onLoad() {},
  active(e){
    this.setData({
      type:e.target.targetDataset.type
    })
  }
});
