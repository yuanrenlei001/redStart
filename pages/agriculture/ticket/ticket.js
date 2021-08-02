const app = getApp();
Page({
  data: {
    type:0,
    pageNum:1,
    pageSize:10,
    list:[],
    flag:true,
    img:app.ajaxImg,
  },
  onLoad() {this.commonProsperityLeadersList();},
  active(e){
    this.setData({
      type:e.target.targetDataset.type,
      pageNum:1,
      list:[]
    })
    this.commonProsperityLeadersList();
  },
    commonProsperityLeadersList(){
  var that =this;
    my.request({
      url: app.ajax+'/vueApi/tickets?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data.result;
                console.log(data.length)
        console.log(res.data.data.pageSize)
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
          list:that.data.list.concat(data)
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  goUrl(e){
    console.log(e.target.targetDataset.id)
    my.navigateTo({
      url: '/pages/agriculture/ticket/ticketDetail/ticketDetail?id='+e.target.targetDataset.id
    });
  },
          onReachBottom() {
    // 页面被拉到底部
    if(this.data.flag){
this.commonProsperityLeadersList()
    }
  },
});
