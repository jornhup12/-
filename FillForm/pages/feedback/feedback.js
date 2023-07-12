// pages/feedback/feedback.js
var api = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback: ''
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
  inputChange: function(e) {
    // console.log(e.detail.value)
    this.setData({
      feedback: e.detail.value
    })
  },
  submitFeedback: function() {
    var feedback = this.data.feedback
    if (feedback.length == 0) {
      wx.showToast({
        title: '反馈意见为空',
        icon: "error"
      })
      return
    } 
    wx.showModal({
      title: '提示',
      content: '提交后无法更改，您确定要提交吗',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '提交中...',
          })

          api.addQuestionnaireFill({
            content: {
              tableDescription: "意见反馈",
              tableName: "意见反馈",
              tables:[{"type": "multiLine", "title": "详细说明", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 194, "content": feedback}]
            }
          }).then(res=>{
            if(res.code == 200) { 
              wx.hideLoading()
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            } else {
              wx.hideLoading()
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 2000
              })
            }
            }
          )
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
