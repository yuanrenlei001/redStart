const app = getApp();
Page({
  data: {
       status: "inited",
    time: "0",
    id:'',
    details:'',
    img:app.ajaxImg,
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
    this.detail(e.id);
  },
  detail(id){
    var that =this;
        my.request({
        url: app.ajax+'/vueApi/redHome/'+id,
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
