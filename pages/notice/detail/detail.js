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
    this.setData({
      id:query.id
    })
    this.notices();
  },
    notices(){
    var that = this;
        my.request({
      url: app.ajax+'/vueApi/notice/'+this.data.id,
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
        wxParse.wxParse('article', 'html',(data.content || data.noticeContent), that, 5);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
});
