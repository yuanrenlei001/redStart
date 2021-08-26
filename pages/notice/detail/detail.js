const app = getApp();
// const wxParse = require('/wxParse/wxParse')
var wxParse = require('/wxParse/wxParse.js');
import HtmlToJson from '/wxParse/html2json.js';
var wxDiscode = require('/wxParse/wxDiscode.js');
var HTMLParser = require('/wxParse/htmlparser.js');
var article = '';
Page({
  data: {
    id:'',
    detail:'',
    flag:false
  },
  onLoad(query) {
    console.log(query)
    if(query.url == 'farmingLoans' && query.type=='zld'){
      this.setData({
      flag:true,
    })
    }
    this.setData({
      id:query.id,
      url:query.url
    })
    this.notices();
  },
    gourl1(){
    my.navigateToMiniProgram({
      appId: '2018090361258298',  // 要跳转的目标小程序 appId。
      path: 'pages/index/index',  // 打开的页面路径，如果为空则打开首页。 
      extraData:{// 需要传递给目标小程序的数据，为键值对的格式，数值的类型为字符串。目标小程序可在 App.onLaunch() 、 App.onShow()  中获取到这份数据。
        "data1":"test"
      },
      success: (res) => {
        console.log(JSON.stringify(res))
      },
      fail: (res) => {
        console.log(JSON.stringify(res))
      },
      complete:(res) => {
           console.log(JSON.stringify(res))
      }
    });
  },
    notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/'+this.data.url+'/'+this.data.id,
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
        wxParse.wxParse('article', 'html',(data.content || data.insuranceIntro || data.noticeContent || data.fileContent), that, 5);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
});
