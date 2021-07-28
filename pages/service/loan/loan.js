const app = getApp();
Page({
  data: {
    list:'',
    list2:'',
    datas:''
  },
  onLoad() {
    var that = this;
    this.notices();
    this.type();
    setTimeout(()=>{
        that.sort();
    },1500)
  },
  sort(){
    let list = this.data.list;
    let list2 = this.data.list2;
    console.log(list)
    console.log(list2)
    let arr = [];
    for(let i=0;i<list.length;i++){
      let obj ={};
      for(let j=0;j<list2.length;j++){
        if(list[i].loansName == list2[j].dictValue){
          obj['name'] = list2[j].dictLabel
          obj['url'] = list[i].loansUrl
          arr.push(obj)
        }
      }
    }
    this.setData({
      datas:arr
    })
    console.log(arr)
  },
  type(){
var that = this;
        my.request({
      url: app.ajax+'/vueApi/dictList?dictType=red_star_loans_name',
      method: 'get',
      data: {},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data;
        that.setData({
          list2:data
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/farmingLoans/?pageNum=1&pageSize=10',
      method: 'get',
      data: {},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data.result;
        that.setData({
          list:data
        })
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  goUrl(e){
    let url = e.target.dataset.url;
    my.navigateTo({
      url: '/pages/web/web?url='+url
    });
  }
});
