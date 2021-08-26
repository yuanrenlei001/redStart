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
  onLoad() {
    this.setData({
      type:0,
      pageNum:1,
      list:[]
    })
      this.commonProsperityLeadersList();
  },
  onShow(){
    
  },
  active(e){
    this.setData({
      type:e.target.targetDataset.type,
      pageNum:1,
      list:[]
    })
    if(e.target.targetDataset.type == 2){
        my.navigateTo({
          url: '/pages/web/web?url=https://sxone.114nz.com'
        });
    }else{
      this.commonProsperityLeadersList();
    }
    
  },
    commonProsperityLeadersList(){
  var that =this;
    my.request({
      url: app.ajax+'/vueApi/farmingStudys?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize+'&studyType='+this.data.type,
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
  goUrl(){
    my.navigateTo({
      url: '/pages/activity/activityYy/activityYy'
    });
  },
          onReachBottom() {
    // 页面被拉到底部
    if(this.data.flag){
this.commonProsperityLeadersList()
    }
  },
});
