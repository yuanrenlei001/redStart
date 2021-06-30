Page({
  data: {
    showFixed:false,
    scale: 14,
    longitude: 120.131441,
    latitude: 30.279383,
    markers: [
      {
      iconPath: "/images/redHome/iconRed.png",
      id: 10,
      latitude: 30.279383,
      longitude: 120.131441,
      width: 50,
      height: 50
    },
    {
      iconPath: "/images/redHome/iconBlue.png",
      id: 10,
      latitude: 30.289383,
      longitude: 120.131441,
      width: 50,
      height: 50
    },
    {
      iconPath: "/images/redHome/iconGreen.png",
      id: 10,
      latitude: 30.299383,
      longitude: 120.131441,
      width: 50,
      height: 50
    },
    {
      iconPath: "/images/redHome/iconBlue.png",
      id: 11,
      latitude: 30.279583,
      longitude: 120.131441,
      width: 50,
      height: 50,
      customCallout: {
        type: 1,
        time: '1',
      },
      fixedPoint:{
        originX: 400,
        originY: 400,
      },
      iconAppendStr: '黄龙时代广场黄龙时代广场黄龙时代广场黄龙时代广场test'
    }],
    includePoints: [{
      latitude: 30.279383,
      longitude: 120.131441,
    }],
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
  },
  
  onReady(e) {
    // 使用 my.createMapContext 获取 map 上下文
    this.mapCtx = my.createMapContext('map')
    this.showsCompass();
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
  
  markertap(e) {
    console.log('marker tap', e);
    this.setData({
      showFixed: true,
    });
  },
  
  controltap(e) {
    console.log('control tap', e);
  },
  goUrl(){
    my.navigateTo({
      url: '/pages/redHome/redDetail/redDetail'
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
    console.log(12321)
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
