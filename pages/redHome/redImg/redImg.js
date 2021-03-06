const app = getApp();
Page({
  data: {
    pageNum:1,
    pageSize:10,
    list:[],
    flag:true,
    url:''
  },
  onLoad(e) {
    this.setData({
      url:e.url
    })
    if(e.insuranceName){
      this.onlineStudys(e.url,e.insuranceName);
    }else{
      this.onlineStudys(e.url);
    }
    
  },
    onlineStudys(url,sort){
    var that =this;
    var urls = '';
    if(sort){
      urls = app.ajax+'/vueApi/'+url+'?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize+'&insuranceName='+sort
    }else{
      urls = app.ajax+'/vueApi/'+url+'?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize
    }
    my.request({
      url: urls,
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
