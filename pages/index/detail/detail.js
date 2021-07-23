const app = getApp();
Page({
  data: {
    id:'',
    detail:'',
    status: "inited",
    time: "0",
    video: {
	src: "http://36.26.84.183:8094/video/nj2.mp4",

  autoPlay: true,
  'show-play-btn':true

    }
  },
  onLoad(query) {
    this.setData({
      id:query.id
    })
    // this.notices();
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

    notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/farmingStudy/'+this.data.id,
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
