var app = getApp();
Page({
  data: {
    showFixed:false,
    scale: 12,
    detail:'',
    longitude: 120.88936,
    latitude: 29.75991,
     markers: [
//        {
//   id: 2,
//   latitude: 29.75991,
//   longitude: 120.88936,
//   // width: 19,
  
//   // height: 31,
//   iconAppendStr:'123',
//   iconAppendStrColor:'red',
//   style:{
//     type:2,
//     text1:'上虞区镇南村竹洞湖果蔬合作社',
//     icon1:'/images/redHome/iconBlue.png'
//   },
//   // iconPath: '/images/redHome/iconBlue.png',

//   markerLevel: 2
// },
//        {
//          title:'3333',
//   id: 3,
//   latitude: 29.7967,
//   longitude: 120.88371,
//   width: 300,
//   // height: 50,
//   style:{
//     type:2,
//      text1:'上虞区镇南村竹洞湖果蔬合作社上虞区镇南',
//     icon1:'/images/redHome/iconRed.png',
//     gravity:"left/center/right", //默认 center
//     fontType:"small/standard/large"  //默认standard
//   },
//   iconPath: '/images/redHome/iconRed.png',

//   markerLevel: 1
// }

],
    pageNum:1,
    pageSize:100,
    id:'',
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
    let marks = [];
    for(let i=0;i<data.length;i++){
      if( data[i].lat!=='' &&  data[i].lon !==''){
        let obj = {};
        let marksObj = {};
        let img = ''
      if(data[i].homeType === 0){obj['iconPath'] = '/images/redHome/iconRed.png';img = '/images/redHome/iconRed.png'}
      else if (data[i].homeType === 1){obj['iconPath'] = '/images/redHome/iconBlue.png';img = '/images/redHome/iconBlue.png'}
      else{obj['iconPath'] = '/images/redHome/iconGreen.png';img = '/images/redHome/iconGreen.png'}
      obj['id'] = data[i].id;
      obj['latitude'] = data[i].lat;
      obj['longitude'] = data[i].lon;
      obj['width'] =50;
      obj['height'] = 50;
      obj['children'] =  data[i];
      obj['markerLevel'] = 10;
      obj['iconAppendStr']=data[i].name
      obj['markerLevel'] = i
  //      obj['label']={
  //   content:"Hello Label",
  //   color:"#00FF00",
  //   fontSize:14,
  //   borderRadius:3,
  //   bgColor:"#ffffff",
  //   padding:10,
    
  // },
  //     obj['style'] = {

  //     // 
      
  //   type:3,
  //    text1:'1231231231',
  //   // icon1:img,
  //   // gravity:"left/center/right", //默认 center
  //   // fontType:"small/standard/large"  //默认standard
  // },
      arr.push(obj)
      // labelMarker.push(marksObj)
     
      }
    }
    
    console.log(arr)
    that.setData({
        markers:arr,
        longitude: arr[0].longitude,
        latitude: arr[0].latitude,
        
    })
    // console.log(that.mapCtx)

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
