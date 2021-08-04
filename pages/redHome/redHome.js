var app = getApp();
Page({
  data: {
    showFixed:false,
    scale: 12,
    detail:'',
    longitude: 120.131441,
    latitude: 30.279383,
     markers: [],
    panels:[{
    	 id:6,
       // 布局参考 map 高级定制渲染
       layout: {
   			 	params:{
      			title:"标题栏",
      			bgColor:"#DC143C"
    			},
   		 		src:"/layout/map_callout.xml"
  		 },
       position: {
         left: 0,
         bottom: 0,
         width: 200,
         height: 84
       },
    }],
    pageNum:1,
    pageSize:100,
    id:''
  },
  
  onReady(e) {
    // 使用 my.createMapContext 获取 map 上下文
    // this.showsCompass();
    this.homeList();
    this.mapCtx = my.createMapContext('map')
    
  },
  getCenterLocation() {
    this.mapCtx.getCenterLocation(function (res) {
      console.log(res.longitude)
      console.log(res.latitude)
    })
  },
  
  moveToLocation() {
    this.mapCtx.moveToLocation()
  },
  
  regionchange(e) {
    console.log('regionchange', e);
	// 注意：如果缩小或者放大了地图比例尺以后，请在 onRegionChange 函数中重新设置 data 的
	// scale 值，否则会出现拖动地图区域后，重新加载导致地图比例尺又变回缩放前的大小。
	if (e.type === 'end') {
      this.setData({
        scale: e.scale
      });
    }
  },
  homeList(){
    var that = this;
    console.log(this.data.pageNum)
    my.request({
  url: app.ajax+'/vueApi/redHomes?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize,
  method: 'get',
  data: {
    
  },
  headers:{
    'content-type':'application/json'  //默认值
  },
  dataType: 'json',
  success: function(res) {
    let data = res.data.data.result;
    let arr = [];
    for(let i=0;i<data.length;i++){
      if( data[i].lat!=='' &&  data[i].lon !==''){
        let obj = {};
      if(data[i].homeType === 0){obj['iconPath'] = '/images/redHome/iconRed.png'}
      else if (data[i].homeType === 1){obj['iconPath'] = '/images/redHome/iconBlue.png'}
      else{obj['iconPath'] = '/images/redHome/iconGreen.png'}
      obj['id'] = data[i].id;
      obj['latitude'] = data[i].lat;
      obj['longitude'] = data[i].lon;
      obj['width'] = 50;
      obj['height'] = 50;
      obj['children'] =  data[i];
      arr.push(obj)
      }
    }
    console.log(arr)
    that.setData({
        markers:arr,
        longitude: arr[0].longitude,
        latitude: arr[0].latitude,
        
    })
    // {
    //   iconPath: "/images/redHome/iconRed.png",
    //   id: 10,
    //   latitude: 30.279383,
    //   longitude: 120.131441,
    //   width: 50,
    //   height: 50
    // },
  },
  fail: function(res) {
    my.alert({content: 'fail'});
  },
  
});
  },
  mapAjax(id){
    // my.alert({title:id})
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
    setTimeout(()=>{
      that.setData({
        detail:res.data.data,
        id:res.data.data.id,
         showFixed:true
    })
    },500)
    
  },
  fail: function(res) {
    my.alert({content: 'fail'});
  },
  
});
  },
  markertap(e) {
    var that = this;
    let id = e.markerId;
     let data = this.data.markers;
      for(let i=0;i<data.length;i++){
        if(data[i].id == e.markerId){
          // console.log(data[i])
         that.setData({
        detail:data[i].children,
        id:data[i].id,
         showFixed:true
    })
    console.log(that.data.detail)
        }
      }
    // console.log(e)

  },
  
  controltap(e) {
    console.log('control tap', e);
  },
  goUrl(e){
    let id = e.target.dataset.id;
    console.log(id.toString())
    // my.alert({title:e.target.dataset.id})
    // my.alert({title:'/pages/redHome/redDetail/redDetail?id='+id.toString()})
    my.navigateTo({
      url: '/pages/redHome/redDetail/redDetail?id='+id.toString()
    });
  },
  defaultTap(){
    console.log(3333)
    this.setData({
      showFixed: false,
    });
  },
  tap() {
    console.log('tap:');
  },
  onPanelTap(e) {
    console.log('paneltap:', e);
  },
  
  changeScale() {
    this.setData({
      scale: 8,
    });
  },
  
  changeCenter() {
    this.setData({
      longitude: 113.324520,
      latitude: 23.199994,
      includePoints: [{
        latitude: 23.199994,
        longitude: 113.324520,
      }],
    });
  },
  //支持地图不接受手势事件, isGestureEnable为1 表示支持，为0表示不支持
  gestureEnable() {
    this.mapCtx.gestureEnable({isGestureEnable:1});
  },
  
//地图是否显示比例尺, isShowsScale 为1表示显示，为0表示不显示
  showsScale() {
    this.mapCtx.showsScale({isShowsScale:0});
  },
  //地图是否显示指南针, isShowsCompass 为1表示显示，为0表示不显示
  showsCompass() {
    this.mapCtx.showsCompass(console.log(12312),{isShowsCompass:0});
  },
  changeMarkers() {
    this.setData({
      markers: [{
        iconPath: "/image/green_tri.png",
        id: 10,
        latitude: 21.21229,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
      includePoints: [{
        latitude: 21.21229,
        longitude: 113.324520,
      }],
    });
  },
})
