const app = getApp();
Page({
  data: {
    type:0,
    pageNum:1,
    pageSize:10,
    list:''
  },
  onLoad() {
    this.policyInfos();
  },
  active(e){
    this.setData({
      type:e.target.targetDataset.type
    });
    this.policyInfos();
  },
  policyInfos(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/policyInfos/?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize+'&infoType='+this.data.type,
      method: 'get',
      data: {},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data.result;
        that.setData({
          list:data
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  goUrl(){
    my.navigateTo({
      url: '/pages/activity/activityYy/activityYy'
    });
  }
});
