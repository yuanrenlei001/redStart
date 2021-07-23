const app = getApp();
// const wxParse = require('/wxParse/wxParse')
var wxParse = require('/wxParse/wxParse.js');
import HtmlToJson from '/wxParse/html2json.js';
var wxDiscode = require('/wxParse/wxDiscode.js');
var HTMLParser = require('/wxParse/htmlparser.js');
var article = '';
Page({
  data: {
    detail:'',
    img:app.ajaxImg,
    text:''
  },
  onLoad(e) {
    console.log(e)
    this.notices(e.id)
    
    
  },
  
  // onlineStudy/{id}
    notices(id){
    var that = this;
    var text = ''
        my.request({
      url: app.ajax+'/vueApi/onlineStudy/'+id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data;
        text = data.content;
        that.setData({
          detail:data,
          text:data.content
        })
         wxParse.wxParse('article', 'html',text, that, 5);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
   
  },
  
});
