const app = getApp();
Page({
  data: {
     pageNum:1,
    pageSize:10,
    list:[],
    flag:true,
     img:app.ajaxImg,

  },
  onLoad() {
    // this.onlineStudys();
  },
  onShow(){
    this.setData({
      pageNum:1,
    pageSize:10,
    list:[],
    })
    this.onlineStudys();
  },
  goUrls(e){
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
      url: '/pages/mark/shareDetail/shareDetail?id='+e.target.dataset.id
    });
          }else{
            my.navigateTo({
              url: '/pages/getAuthorize/getAuthorize'
            });
         
          }
      },
    }); 
  },
  previewImage(e){
    console.log(e)
    var that =this;
    let url = [];
    let imgList = e.target.dataset.img;
    for(let i=0;i<imgList.length;i++){
      url.push(that.data.img+imgList[i].fileNewName)
    }
    console.log(url)
    my.previewImage({
      current: e.target.dataset.index,
      urls: url,
    });
  },
  goUrl(){
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
      url: '/pages/mark/shareAdd/shareAdd'
    });
          }else{
            my.navigateTo({
              url: '/pages/getAuthorize/getAuthorize'
            });
         
          }
      },
    });
  },
      onlineStudys(){
    var that =this;
    my.request({
      url: app.ajax+'/vueApi/purchases?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize,
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
