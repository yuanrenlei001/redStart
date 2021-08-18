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
    ids:''
  },
  onLoad(query) {
    console.log(query)
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
