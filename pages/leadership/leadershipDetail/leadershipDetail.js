const app = getApp();
Page({
  data: {
    detail:'',
    img:app.ajaxImg,
    id:'',
    url:'',
    type:'GFDTR'
  },
  onLoad(e) {
    console.log(e)
    this.notices(e.id,e.url);
    this.setData({
        id:e.id,
        url:e.url,
        type:e.url=='commonProsperityLeader'?'GFDTR':'JDBF'
    })
  },
  addZan(){
    var that = this;
    my.request({
      url: app.ajax+'/vueApi/othLikes/add/?id='+this.data.id+'&type='+this.data.type,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.notices(that.data.id,that.data.url)
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
    unZan(){
    var that = this;
    my.request({
      url: app.ajax+'/vueApi/othLikes/del/?id='+this.data.id+'&type='+this.data.type,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.notices(that.data.id,that.data.url)
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
      notices(id,url){
    var that = this;
    var text = ''
        my.request({
      url: app.ajax+'/vueApi/'+url+'/'+id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data;
        that.setData({
          detail:data,
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
   
  },
});
