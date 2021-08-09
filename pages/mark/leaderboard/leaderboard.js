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
        var data = res.data.data.result;
        var min;
      for(let i=0; i<data.length; i++){
                for(let j=i; j<data.length;j++){
                    if(data[i].sort>data[j].sort){
                      min=data[j];
                      data[j]=data[i];
                      data[i]=min;
                    }
                }
            }
            // console.log(data)
// let arr = [25,148,12,6,38];
// let result = arr.sort((a,b) => a - b);

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
  goUrl(e){
    let data = JSON.stringify(e.target.dataset.data)
    my.navigateTo({
      url: '/pages/mark/leaderboard/detail/detail?data='+data
    });
  },
    onReachBottom() {
    // 页面被拉到底部
        if(this.data.flag){
this.notices()
    }
  },
});
