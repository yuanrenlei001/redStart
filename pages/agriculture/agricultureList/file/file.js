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
    flag:false,
    imgFlag:false
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
        console.log(data.imgPathInfo[0].fileSuffix == 'png' || data.imgPathInfo[0].fileSuffix == 'jpg')
        if(data.imgPathInfo[0].fileSuffix == 'png' || data.imgPathInfo[0].fileSuffix == 'jpg'){
          console.log(1)
          
          that.setData({
            imgFlag:true
          })
        }else{
           console.log(2)
          that.openFile(data.imgPathInfo[0].filePath);
          that.setData({
            imgFlag:false
          })
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
