const app = getApp();
Page({
  data: {
    type:'HDZM',
    pageNum:1,
    pageSize:10,
    list:[],
    img:app.ajaxImg,
    flag:true,
    url:'my/positionBookings'
  },
  onLoad() {
    this.commonProsperityLeadersList();
  },
  active(e){
    console.log(e.target.targetDataset.type)
    if(e.target.targetDataset.type == 'HDZM'){
      this.setData({
        type:e.target.targetDataset.type,
        url:'my/positionBookings',
        pageNum:1,
        list:[]
      })
    }else{
      this.setData({
        type:e.target.targetDataset.type,
        url:'my/positionBookings',
        pageNum:1,
        list:[]
      })
    }
    this.commonProsperityLeadersList();
  },
  commonProsperityLeadersList(){
  var that =this;
    my.request({
      url: app.ajax+'/vueApi/'+this.data.url+'/'+this.data.type+'?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize,
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
          list:that.data.list.concat(data)
        })
        console.log(that.data.list)
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  gourlS(e){
    console.log(e.target.dataset.data)
     my.navigateTo({
      url:'/pages/user/myPositionBookings/detail/detail?data='+JSON.stringify(e.target.dataset.data)
    })
  },
  // url="/pages/user/myPositionBookings/detail/detail?data={{item.applicantUser}}"
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
