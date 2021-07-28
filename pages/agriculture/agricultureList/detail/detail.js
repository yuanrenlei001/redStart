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
    text:'',
    flag:false
  },
  onLoad(e) {
    console.log(e)
    if(e.img){
      console.log(1)
      this.setData({
        flag:true,
        detail:e.id
      })
    }else{
this.notices(e.id,e.url,e.img) 
    }
    
  },
  
  // onlineStudy/{id}
    notices(id,url){
      
 var that = this;
    var text = ''
        my.request({
      url: app.ajax+'/vueApi/'+url+'/'+id,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let data = res.data.data;
        text = data.fileContent;
        that.setData({
          detail:data,
        })
         wxParse.wxParse('article', 'html',text, that, 5);
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
      
   
   
  },
  
});
