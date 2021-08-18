const app = getApp();
Page({
  data: {
    type:1,
    pageNum:1,
    pageSize:10,
    list:[],
    flag:true,
    url:'eventRecruitments'
  },
  onLoad(e) {
    this.commonProsperityLeadersList();
  },
  active(e){
    console.log(e.target.targetDataset.type)
    if(e.target.targetDataset.type == 1){
      this.setData({
        type:e.target.targetDataset.type,
        url:'eventRecruitments',
        pageNum:1,
        list:[]
      })
    }else{
      this.setData({
        type:e.target.targetDataset.type,
        url:'positionBookings',
        pageNum:1,
        list:[]
      })
    }
    // this.commonProsperityLeadersList();
  },
  sp(e){
    let data = JSON.stringify(e.target.dataset.data)
    my.navigateTo({
      url: '/pages/user/declarationEntrys/detail/detail?data='+data
    });
    // url=""
  },
  commonProsperityLeadersList(url){
  var that =this;
    my.request({
      url: app.ajax+'/vueApi/my/declarationEntrys?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize,
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
  // commonProsperityLeaders  共富带头人
  // helpPairs 结队帮扶
  goUrl(){
    my.navigateTo({
      url:'/pages/activity/activityYy/activityYy'
    });
  },
        onReachBottom() {
    // 页面被拉到底部
    if(this.data.flag){
this.commonProsperityLeadersList()
    }
  },
});
