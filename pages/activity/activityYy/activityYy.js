const app = getApp();
Page({
   data: {
     pageNum:1,
    pageSize:10,
    list:[],
    flag:true,
    applicantUser:'',
    contactPhone:'',
    applicantUnit:'',
    address:'',
    appointmentTime:'',
    multi:'Y',
    participateNum:'',
    remark:''
  },
  onLoad() {
    // this.add();
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
        applicantUser:this.data.applicantUser,
        contactPhone:this.data.contactPhone,
        applicantUnit:this.data.applicantUnit,
        address:this.data.address,
        appointmentTime:this.data.appointmentTime,
        multi:this.data.multi,
        participateNum:this.data.participateNum,
        remark:this.data.remark
    }
    console.log(data)
        my.request({
      url: app.ajax+'/vueApi/positionBooking/add',
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
    my.datePicker({
      currentDate: '2019-10-10',
      startDate: '2019-10-9',
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
});