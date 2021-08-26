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
    title:'',
    ids:'',
    gourlss:true
  },
  onLoad(query) {
    console.log(query.id)
    if(query.id == 3){
      this.setData({
      gourlss:false
    })
    }
    this.setData({
      title:query.title,
      ids:query.id
    })
    this.notices(query.id);
  },
    notices(id){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/declareDesc/'+id,
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
        wxParse.wxParse('article', 'html',(data.description), that, 5);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
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
  showFile(e){
    my.downloadFile({
      url: e.target.dataset.url,
      success({ apFilePath }) {
        my.hideLoading();
        my.openDocument({
          filePath: apFilePath,
          fileType: 'pdf',
          success: (res) => {
            console.log('open document success')
            }
          })
        }
      })
  }
});
