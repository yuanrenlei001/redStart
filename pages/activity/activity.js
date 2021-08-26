const app = getApp();
Page({
  data: {
    type:1,
    pageNum:1,
    pageSize:10,
    list:[],
    img:app.ajaxImg,
    flag:true,
    url:'eventRecruitments'
  },
  onLoad() {
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
    this.commonProsperityLeadersList();
  },
  commonProsperityLeadersList(){
  var that =this;
    my.request({
      url: app.ajax+'/vueApi/'+this.data.url+'?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize,
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
    var that = this;
    var key = 'userInfo';
              my.request({
      url: app.ajax+'/common/isLogin',
      method: 'post',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
          if(res.data.code==0){
              my.navigateTo({
      url: '/pages/activity/activityYy/activityYy'
    });
          }else{
            my.navigateTo({
              url: '/pages/getAuthorize/getAuthorize'
            });
         
          }
      },
    }); 
 
    
  },
  goMap(){
    my.navigateTo({
      url:'/pages/web/web?url='+'https://vr.zjytx.net/tour/3a69efdab609198a'
    });
  },
        onReachBottom() {
    // 页面被拉到底部
    if(this.data.flag){
this.commonProsperityLeadersList()
    }
  },
});
