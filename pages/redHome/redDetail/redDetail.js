const app = getApp();
Page({
  data: {
       status: "inited",
    time: "0",
    id:'',
    details:'',
    img:app.ajaxImg,
    show:false,
    autoPlay:true,
    videoSrc:'',
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
	autoPlay: true,
	directionWhenFullScreen: 90,
  mobilenetHintType: 2,
  longitude: '120.126293',
    latitude: '30.274653',
    name: '黄龙万科中心',
    address: '学院路77号',
 },},
onLoad(e) {
  // my.alert({title:e.id})
    this.detail(e.id);
  },

  onPlay(e) {
	console.log('onPlay');
},
   openLocation() {
     var that =this;
     console.log(that.data)
     my.openLocation({
       longitude: that.data.details.lon,
      latitude: that.data.details.lat,
      name:that.data.details.name,
      address: that.data.details.areaCode,
    });
    // my.openLocation({
    //   longitude: this.data.longitude,
    //   latitude: this.data.latitude,
    //   name: this.data.name,
    //   address: this.data.address,
    // })
  },
  phone(e) {
    console.log(e.target.targetDataset.phone)
    my.makePhoneCall({ number: e.target.targetDataset.phone });
  },
    uncollect(e){
    var that =this;
    let data = {
 "type": "HXZJ",
 "collId": this.data.details.id,
 "collName": this.data.details.name
      

}
my.request({
      url: app.ajax+'/vueApi/collection/remove?id='+this.data.details.id+'&type=HXZJ',
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
 "type": "HXZJ",
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
        url: app.ajax+'/vueApi/redHome/'+id,
        method: 'get',
        data: {
          
        },
        headers:{
          'content-type':'application/json'  //默认值
        },
        dataType: 'json',
        success: function(res) {
          // my.alert({title:JSON.stringify(res.data.data.areaCode)})
          // let data = res.data.data.result;
          if(res.data.data.videoUrl){
            that.setData({
              videoSrc:res.data.data.videoUrl
          })
          }else{
            that.setData({
              videoSrc:that.data.img+res.data.data.videoInfoList[0].fileNewName
          })
          }
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
