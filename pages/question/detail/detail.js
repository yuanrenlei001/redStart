const app = getApp();
Page({
  data: {
     pageNum:1,
    pageSize:10,
    list:[],
    detail:'',
    flag:true,
    fixed:false,
     img:app.ajaxImg,
     questionDetails:''

  },
  onLoad(e) {
    this.onlineStudys(e.id);
  },
    bindTextAreaBlur(e){
    this.setData({
      questionDetails:e.detail.value
    })
  },
    success(){
    let data = {
      // "type":
    "replyDetails": this.data.questionDetails,
    "id": this.data.detail.id
      
    
    }
    
var that = this;
    my.request({
      url: app.ajax+'/vueApi/consultingService/edit',
      method: 'post',
      data: data,
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.setData({
      fixed:false
    });
    that.onlineStudys(that.data.detail.id);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
    console.log(data)
    
  },
  cancel(){
    this.setData({
      fixed:false
    })
  },
    addZan(e){
    var that = this;
    my.request({
      url: app.ajax+'/vueApi/othLikes/add/?id='+this.data.detail.id+'&type=QCG',
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.onlineStudys(that.data.detail.id)
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
    addCommit(){
    this.setData({
      fixed:true
    })
  },
    unZan(e){
    var that = this;
    my.request({
      url: app.ajax+'/vueApi/othLikes/del/?id='+this.data.detail.id+'&type=QCG',
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.onlineStudys(that.data.detail.id)
      },
      fail: function(res) {
        my.alert({content: 'fail'});
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

      onlineStudys(id){
    var that =this;
    my.request({
      url: app.ajax+'/vueApi/consultingService/'+id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
          that.setData({
detail:res.data.data
          })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
 
});
