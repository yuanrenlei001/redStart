const app = getApp();
Page({
  data: {
    pageNum:1,
    pageSize:10,
    list:[],
    type:0,
    img:app.ajaxImg,
    flag:true
  },
  onLoad() {
    console.log(app)
    this.onlineStudys();
  },
   active(e){
    console.log(e.target.targetDataset.type)
    if(e.target.targetDataset.type == 0){
      this.setData({
        type:e.target.targetDataset.type,
        url:'commonProsperityLeaders',
        pageNum:1,
        list:[]
      })
    }else{
      this.setData({
        type:e.target.targetDataset.type,
        url:'helpPairs',
        pageNum:1,
        list:[]
      })
    }
    this.onlineStudys();
  },
  onlineStudys(){
    var that =this;
    my.request({
      url: app.ajax+'/vueApi/onlineStudys?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize+'&studyType='+this.data.type,
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
      onReachBottom() {
    // 页面被拉到底部
    if(this.data.flag){
this.onlineStudys()
    }
  },
});
