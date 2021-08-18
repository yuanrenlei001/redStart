const app = getApp();
Page({
   data: {
     title:'',
     pageNum:1,
    pageSize:10,
    flags:false,
    list:[],
    flag:false,
    applicantUser:'',
    contactPhone:'',
    applicantUnit:'',
    address:'',
    appointmentTime:'',
    multi:'Y',
    participateNum:'',
    remark:'',
    array: '',
    index:0,
    img:[],
    imgId:[],
    name:'',
    id:'',
    datas:''
  },
  onLoad(e) {
    this.setData({
      datas:JSON.parse(e.data)
    })
   console.log(JSON.parse(e.data))
    // this.setData({
    //   title:e.title
    // })
    // this.select();
    // this.add();
  },
  bindPickerChange(e) {
    console.log(e.target.dataset.name);
    this.setData({
      index: e.detail.value,
      id:e.target.dataset.id,
      name: e.target.dataset.name,
    });
  },
    select(){
    var that =this;
        my.request({
      url: app.ajax+'/vueApi/getRedHomes',
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
          arr.push(res.data.data[i])
        }
        console.log(arr)
        that.setData({
            array:arr,
            name:arr[0].name,
            id:arr[0].id
        })
  //  
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  applicantUser(e){this.setData({applicantUser:e.detail.value})},
  contactPhone(e){this.setData({contactPhone:e.detail.value})},
  applicantUnit(e){this.setData({applicantUnit:e.detail.value})},
  address(e){this.setData({address:e.detail.value})},
  radioChange(e){this.setData({multi:e.detail.value})},
  participateNum(e){this.setData({participateNum:e.detail.value})},
  remark(e){this.setData({remark:e.detail.value})},
  add(){
    var that =this;
    let data = {
        declarationType:this.data.title=='星级合作社申报'?'0':'1',//申报分类
        name:this.data.name,//合作社名称
        declareUser:this.data.applicantUnit,//申报人
        homeId:this.data.id,//合作社id
        declareDate:this.data.appointmentTime,//申报时间
        dataUpload:(this.data.imgId).toString(),
    }
    console.log(data)
        my.request({
      url: app.ajax+'/vueApi/declarationEntry/add',
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
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
    });
  },
  datePicker() {
    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
    my.datePicker({
      currentDate: '2019-10-10',
      startDate: getNowFormatDate(),
      endDate: '2025-10-9',
      success: (res) => {
        console.log(res)
        this.setData({
          appointmentTime:res.date
        })
        // my.alert({
        //   title: 'datePicker response: ' + JSON.stringify(res)
        // });
      },
    });
  },
  datePickerHMS() {
    my.datePicker({
      format: 'HH:mm',
      currentDate: '12:12',
      startDate: '11:11',
      endDate: '13:13',
      success: (res) => {
       console.log(JSON.stringify(res))
      },
    });
  },
  datePickerYMDHMS() {
    my.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: '2012-01-09 11:11',
      startDate: '2012-01-01 11:11',
      endDate: '2012-01-10 11:11',
      success: (res) => {
        console.log(JSON.stringify(res))
      },
    });
  },
    uploadFile() {
    var that =this;
    
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        console.log(res);
        that.setData({flag:true})
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

            that.setData({
         flag:false,
          img:that.data.img.concat(res.data.url),
          imgId:that.data.imgId.concat(res.data.fileId),
        })
        
      
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
});