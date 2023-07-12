// pages/release/release.js
var api = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaireFillList:[],
    questionnaireList: [],
    TabCur: 0,
    TabList: ["我发布的", "我填写的"]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    this.onShow()
  },

  navigateToFillForm(event) {
    let index = event.currentTarget.dataset.index
    var questionnaireFill = JSON.stringify(this.data.questionnaireFillList[index])
    wx.navigateTo({
      url: `../write/table/table?questionnaireFill=${questionnaireFill}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  fillForm(e) {
    wx.navigateTo({
      url: '/pages/table/fill/fill?id=' + e.detail.id,
    })
  },
  deleteForm(e) {
    const id = e.detail.id
    wx.showModal({
      title: '提示',
      content: '确定删除该问卷吗？',
      success: (res) => {
        if (res.confirm) {
          api.deleteQuestionnaire({
            "id": id
          }).then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
            this.setData({
              questionnaireList: this.data.questionnaireList.filter(item => item.id !== id)
            })
          }).catch(err => {
            console.log(err)
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
    if(this.data.TabCur == 0)
      api.fetchQuestionnaireList().then(res => {
        this.setData({
          questionnaireList: res.data
        })
      }).catch(err => {
        console.log(err)
      })
    else  
      api.fetchQuestionnaireFillList().then(res => {
        this.setData({
          questionnaireFillList:res.data
        })
      }).catch(err => {
        console.log(err)
      })
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
  onShareAppMessage: function(res) {
      return {
        path: '/pages/table/fill/fill?id=' + res.target.dataset.id,
      }
    },
})