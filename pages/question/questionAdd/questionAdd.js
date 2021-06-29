Page({
  data: {
    array: ['中国', '美国', '巴西', '日本'],
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
  onLoad() {},
});
