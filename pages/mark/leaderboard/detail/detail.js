const app = getApp();
Page({
  data: {
    type:1,
    pageNum:1,
    pageSize:10,
    list:[],
    img:app.ajaxImg,
    flag:true,
    url:'eventRecruitments',
    data:''
  },
  onLoad(e) {
    console.log(e)
    this.setData({
      data:JSON.parse(e.data)
    })
    // this.commonProsperityLeadersList();
  },

        onReachBottom() {
    // 页面被拉到底部
  
  },
});
