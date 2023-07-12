// pages/table/add/add.js
var api = require("../../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newItem: {},
    jsonOptions: {
      tableDescription: "",
      tableName: ""
    },
    drawerList: [{
        icon: "post",
        type: "singleLine",
        label: "单行输入"
      },
      {
        icon: "post",
        type: "multiLine",
        label: "多行输入"
      },
      {
        icon: "radiobox",
        type: "singleOption",
        label: "单选列表"
      },
      {
        icon: "squarecheck",
        type: "multiOption",
        label: "多选列表"
      },
      {
        type: "pic",
        icon: "pic",
        label: "图片上传"
      }
    ],
    tables: [
      // {
      //   type: "singleLine",
      //   mandatory: false,
      //   title: "123123"
      // },
      // {
      //   type: "multiLine",
      //   mandatory: true,
      //   title: "123123"
      // },
      // {
      //   type: "singleOption",
      //   mandatory: false,
      //   options: [{
      //     label: "123"
      //   }, {
      //     label: "123"
      //   }],
      //   title: "123123"
      // },
      // {
      //   type: "multiOption",
      //   mandatory: false,
      //   options: [{
      //     label: "123"
      //   }, {
      //     label: "123"
      //   }],
      //   title: "123123"
      // },
      // {
      //   type: "pic",
      //   mandatory: false,
      //   title: "123123"
      // },
    ],
    imgList: []
  },

  deleteItem(e) {
    console.log(e)
    const index = e.detail;
    const tables = this.data.tables;
    tables.splice(index, 1);
    this.setData({
      tables: tables
    })
  },

onSubmit(e) {
    const {
      tableDescription,
      tableName
    } = this.data.jsonOptions;
    const tables = this.data.tables;
    const data = {
      tableDescription,
      tableName,
      tables
    }
    api.addQuestionnaire(data).then(res => {
      console.log(res)
      if(res.code == 200) {
        wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      })
         setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
      } else {
        wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 2000
      })
      }
      
     
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 2000
      })
    })
  },

  ChooseImage(e) {
    const index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        const tables = this.data.tables;
        tables[index].url = res.tempFilePaths[0];
        this.setData({
          tables: tables
        })
      }
    })
  },
  DelImg(e) {
    const index = e.currentTarget.dataset.index;
    const tables = this.data.tables;
    tables[index].url = "";
    this.setData({
      tables: tables
    })
  },
  ViewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("options", options)
    const jsonOptions = options && options.data ? JSON.parse(options.data) : {};
    this.setData({
      jsonOptions: jsonOptions
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
    console.log(this.data.newItem)
    if (this.data.newItem && Object.keys(this.data.newItem).length !== 0) {
      this.setData({
        tables: [...this.data.tables, this.data.newItem],
        newItem: {},
        isOpenDrawer: false
      })
    }
    console.log("tables", this.data.tables)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  triggerFunction(event) {
    console.log(event.currentTarget.dataset.type);
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
  openDrawer() {
    this.setData({
      isOpenDrawer: true
    })
  },
  hideModal() {
    this.setData({
      isOpenDrawer: false
    })
  }
})