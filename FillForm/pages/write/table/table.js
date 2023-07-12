// pages/write/table/table.js
var api = require("../../../http/api")
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
    console.log(options)
    const questionnaireFill = JSON.parse(options.questionnaireFill)
    console.log(questionnaireFill)
    this.setData({ questionnaireFill })    
  },
  onDeleteItem(event) {
    const { index } = event.currentTarget.dataset
    const { questionnaireFill } = this.data
    wx.showModal({
      title: '提示',
      content: '是否删除该项？',
      success: (res) => {
        if (res.confirm) {
          api.deleteQuestionnaireFill({"id": this.data.questionnaireFill.id}).then(res => {
            if (res.code == 200 ) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 2000)
            }
          }).catch(err => {
            console.log(err)
            wx.showToast({
              title: '删除失败',
              icon: 'none',
              duration: 2000
            })
          })
        }
      }
    })
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

  }
})