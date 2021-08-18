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
    id:'',
    url:'',
    type:'GFDTR'
  },
  onLoad(e) {
    console.log(e)
    this.notices(e.id,e.url);
    this.setData({
        id:e.id,
        url:e.url,
        type:e.url=='commonProsperityLeader'?'GFDTR':'JDBF'
    })
  },
  addZan(){
    var that = this;
             my.request({
      url: app.ajax+'/common/isLogin',
      method: 'post',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
          if(res.data.code==0){
              my.request({
      url: app.ajax+'/vueApi/othLikes/add/?id='+that.data.id+'&type='+that.data.type,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json',
        'ajaxHeader':'ajaxHeader'
        // 'ajaxHeader':'userName'
      },
      dataType: 'json',
      success: function(res) {
        
          that.notices(that.data.id,that.data.url)
                
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
          }else{
            my.navigateTo({
              url: '/pages/getAuthorize/getAuthorize'
            });
         
          }
      },
    }); 
    
  },
    unZan(){
    var that = this;
          my.request({
      url: app.ajax+'/common/isLogin',
      method: 'post',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
          if(res.data.code==0){
              my.request({
      url: app.ajax+'/vueApi/othLikes/del/?id='+that.data.id+'&type='+that.data.type,
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json',
        'ajaxHeader':'ajaxHeader'
      },
      dataType: 'json',
      success: function(res) {
        
          that.notices(that.data.id,that.data.url)
        
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
          }else{
            my.navigateTo({
              url: '/pages/getAuthorize/getAuthorize'
            });
         
          }
      },
    }); 
    
  },
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
        that.setData({
          detail:data,
        })
        if(that.data.type == 'JDBF'){
          wxParse.wxParse('article', 'html',data.introduction, that, 5);
        }
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
   
  },
});
