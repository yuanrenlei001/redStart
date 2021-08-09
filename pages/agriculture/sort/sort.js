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
    detail:''
  },
  onLoad(query) {
    console.log(query)
    // this.setData({
    //   id:query.id,
    //   url:query.url
    // })
    this.notices();
  },
    notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/exchange/40',
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
        wxParse.wxParse('article', 'html',(data.content || data.noticeContent || data.fileContent), that, 5);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
});
