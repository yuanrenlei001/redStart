var app = getApp();
Page({
  data: {
    noticesList:[],
    pageNum:1,
    img:app.ajaxImg,
    flag:true
  },
  onLoad() {
    this.notices();
  },
    notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/takeAways?pageNum='+this.data.pageNum+'&pageSize=10',
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data.result;
        if(data.length>=res.data.data.pageSize){
           that.setData({
          pageNum:that.data.pageNum+1,
          flag:true
        })
        }else{
           that.setData({
          flag:false
        })
        }
        that.setData({
          noticesList:that.data.noticesList.concat(data)
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
    onReachBottom() {
    // 页面被拉到底部
        if(this.data.flag){
this.notices()
    }
  },
});
