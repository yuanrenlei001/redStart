const app = getApp();
Page({
  data: {
    list:''
  },
  onLoad() {
    this.notices();
  },
  notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/farmingLoans/?pageNum=1&pageSize=10',
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
  goUrl(e){
    let url = e.target.targetDataset.url.insuranceUrl;
    console.log()
    my.navigateTo({
      url: '/pages/web/web?url='+url
    });
  }
});
