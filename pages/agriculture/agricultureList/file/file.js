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
   this.notices(e.id,e.url) 
    
  },
  openFile(url){
    my.downloadFile({
  // 示例 url，并非真实存在
      url: url,
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
        // if(data.fileContent){
        //     text = data.fileContent;
        //     wxParse.wxParse('article', 'html',text, that, 5);
        // }
        if(data.imgPathInfo){
          that.openFile(data.imgPathInfo[0].filePath);
        }
        that.setData({
          detail:data,
        })
         console.log(data)
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
      
   
   
  },
  
});
