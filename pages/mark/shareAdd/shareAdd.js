const app = getApp();
Page({
  data: {
    array: [],
    index:0,
    questionDetails:'',
    img:[],
    imgId:[],
    flag:false,
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
  onLoad() {
    this.select();
  },
  select(){
    var that =this;
        my.request({
      url: app.ajax+'/vueApi/dictList?dictType=red_star_question_type',
      method: 'get',
      data: {
        
      },
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let arr = [];
        for(let i=0;i<res.data.data.length;i++){
          arr.push(res.data.data[i].dictLabel)
        }
        that.setData({
            array:arr
        })
  //  
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  bindTextAreaBlur(e){
    this.setData({
      questionDetails:e.detail.value
    })
  },
  uploadFile() {
    var that =this;
    
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        console.log(res);
       my.showLoading({
      content: '加载中...',
      delay: 1000,
    });
        my.uploadFile({
          url: 'https://httpbin.org/post',
          fileType: 'image',
          fileName: 'file',
          filePath: path,
          success: res => {
            
            if(JSON.parse(res.data).files.file){
                my.request({
      url: app.ajax+'/common/base64',
      method: 'post',
      data: {
        "base64String": JSON.parse(res.data).files.file
      },
      headers:{
        'content-type':'application/json',  //默认值
        'ajaxHeader': 'image',
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
       that.setData({
        //  flag:false,
          img:that.data.img.concat(res.data.url),
          imgId:that.data.imgId.concat(res.data.fileId),
        })
         my.hideLoading();
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
              
            }
            // my.alert({ title: '上传成功' });
          },
          fail: function(res) {
            my.alert({ title: '上传失败' });
          },
        });
      },
    });
  },
  success(){
    let data = {
        introduction:this.data.questionDetails,
        imgIds:(this.data.imgId).toString()
    };
    console.log(data)
       var that =this;
        my.request({
      url: app.ajax+'/vueApi/purchase/add',
      method: 'post',
      data:data,
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        if(res.data.code == 0){
           my.showToast({
            content: '成功',
            type: 'success',
            duration: 1000
          });
          setTimeout(()=>{
            my.navigateBack();
          })
        }
  //  
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
    // console.log(data)
  }
});
