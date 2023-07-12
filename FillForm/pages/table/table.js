// pages/table/table.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  formSubmit(e) {
    const formData = e.detail.value;
    let isFormEmpty = true;
    for (let key in formData) {
      if (formData[key] === '') {
        wx.showToast({
          title: '请填写表单',
          icon: 'none'
        });
        return;
      }
    }
    console.log('form发生了submit事件，携带数据为：', formData)
    wx.navigateTo({
      url: './add/add?data=' + JSON.stringify(formData)
    })
  }
})
