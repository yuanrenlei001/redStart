const app = getApp();
Page({
  data: {
    listLeft:'',
    typeId:'',
    pageNum:1,
    pageSize:100,
    list:[],
    flag:true,
    listRight:''
  },
  onLoad() {
    this.sort();
  },
    sort() {
    var that = this;
        my.request({
  url: app.ajax+'/vueApi/dictList?dictType=red_star_test_notice_type',
  method: 'get',
  data: {
    
  },
  headers:{
    'content-type':'application/json'  //默认值
  },
  dataType: 'json',
  success: function(res) {
    // let data = res.data.data.result;
    console.log(res.data.data)
    that.setData({
      listLeft:res.data.data,
      typeId:res.data.data[0].dictValue
    })
    that.detailList(res.data.data[0].dictValue)
  },
  fail: function(res) {
    my.alert({content: 'fail'});
  },
  
});
  },
  sortActive(e){
    console.log()
    let id = e.target.targetDataset.id;
    this.setData({
      typeId:id
    });
    this.detailList(id)
  },
  detailList(id){    
    var that = this;
    that.setData({
      listRight:''
    });
           my.request({
  url: app.ajax+'/vueApi/testNotices?pageNum='+this.data.pageNum+'&pageSize='+this.data.pageSize+'&dictCode='+id,
  method: 'get',
  data: {
    
  },
  headers:{
    'content-type':'application/json'  //默认值
  },
  dataType: 'json',
  success: function(res) {
    // listRight
    that.setData({
      listRight:res.data.data.result
    });
  },
  fail: function(res) {
    my.alert({content: 'fail'});
  },
  
});
  }
});
