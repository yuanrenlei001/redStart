const app = getApp();
Page({
  data: {
    id:'',
    detail:'',
    status: "inited",
    img:app.ajaxImg,
    time: "0",
    plText:'',
    fixed:false,
    video: {
	src: "http://36.26.84.183:8094/video/nj2.mp4",

  autoPlay: false,
  'show-play-btn':true

    }
  },
  onLoad(query) {
    this.setData({
      id:query.id
    })
    this.notices(query.id);
  },
  bindTextAreaBlur(e){
    this.setData({
      plText:e.detail.value
    })
  },
  addCommit(){
    this.setData({
      fixed:true
    })
  },
      uncollects(e){
        var that =this;
    let data = {
      redStarCollection:{
 "type": "NJJT",
 "collId": this.data.detail.id,
 "collName": this.data.detail.name
      }

}
my.request({
      url: app.ajax+'/vueApi/collection/remove?ids='+this.data.detail.id,
      method: 'get',
      data: {},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.notices(that.data.detail.id);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
    collects(e){
      var that =this;
    let data = {
     
 "type": "NJJT",
 "collId": this.data.detail.id,
 "collName": this.data.detail.title
      

}
my.request({
      url: app.ajax+'/vueApi/collection/add',
      method: 'post',
      data: data,
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
      that.notices(that.data.detail.id);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  success(){
    let data = {

"type": "NJJTPL",
    "content": this.data.plText,
    "relationId": this.data.id
      
    
    }
    
var that = this;
    my.request({
      url: app.ajax+'/vueApi/addComment',
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
    that.notices(that.data.detail.id);
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
      url: app.ajax+'/vueApi/othLikes/add/?id='+this.data.id+'&type=NJJT',
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
    unZan(e){
    var that = this;
    my.request({
      url: app.ajax+'/vueApi/othLikes/del/?id='+this.data.id+'&type=NJJT',
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
   onPlay(e) {
	console.log('onPlay');
},

    onPause(e) {
	console.log('onPause');
},

    onEnded(e) {
	console.log('onEnded');
},

    notices(id){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/farmingStudy/'+id,
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
          detail:data
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
});
