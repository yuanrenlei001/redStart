const app = getApp();
Page({
  data: {
       status: "inited",
    time: "0",
    id:'',
    details:'',
    img:app.ajaxImg,
    show:false,
    video: {
	src: "http://36.26.84.183:8094/video/blny.mp4",
	showAllControls: false,
	showPlayButton: false,
	showCenterButton: true,
	showFullScreenButton: true,
	isLooping: false,
	muteWhenPlaying: false,
	initTime: 0,
	objectFit: "contain",
	autoPlay: false,
	directionWhenFullScreen: 90,
	mobilenetHintType: 2,
 },},
onLoad(e) {
  console.log(e)
    this.detail(e.id);
  },
      uncollect(e){
    var that =this;
    let data = {
 "type": "HXZJ",
 "collId": this.data.details.id,
 "collName": this.data.details.name
      

}
my.request({
      url: app.ajax+'/vueApi/collection/remove?id='+this.data.details.id+'&type=PZFW',
      method: 'get',
      data: {},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.detail(that.data.details.id);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  collect(e){
    var that =this;
    let data = {
 "type": "PZFW",
 "collId": this.data.details.id,
 "collName": this.data.details.name
      

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
        that.detail(that.data.details.id);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  close(e){
    this.setData({
      show:false
    })
  },
   previewImage(e) {
     console.log(e)
    my.previewImage({
      current: 2,
      urls: [
        e.target.targetDataset.src
      ],
    });
  },
  videoss(e){
    console.log(123123)
    this.setData({
      show:true
    })
  },
  detail(id){
    var that =this;
        my.request({
        url: app.ajax+'/vueApi/ticket/'+id,
        method: 'get',
        data: {
          
        },
        headers:{
          'content-type':'application/json'  //默认值
        },
        dataType: 'json',
        success: function(res) {
          // let data = res.data.data.result;
          that.setData({
              details:res.data.data
          })
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

    onPlayError(e) {
	console.log('onPlayError, e=' + JSON.stringify(e));
},

    onTimeUpdate(e) {
	console.log('onTimeUpdate:', e.detail.currentTime);
}, 	
});
