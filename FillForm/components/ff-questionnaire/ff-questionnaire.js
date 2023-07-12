// components/ff-questionnaire/ff-questionnaire.js
var api = require("../../http/api")
const imageUrl = require('../../http/config').imageUrl
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    enableFill: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
        // do something when enableFill changes
      },
    },

    delete: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        // do something when fields list changes
        // console.log(newVal)
      },
    },

    tables: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        // do something when tables list changes
        // console.log(newVal)
      },
    },tableDescription: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        // do something when tableDescription changes
      },
    },
    tableName: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        // do something when tableName changes
      },
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    results: [],
    imageUrl: imageUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
getMultiOptionValue(e) {
      const index = e.currentTarget.dataset.index;
      const value = e.detail.value;
      const tables = this.data.tables;
      tables[index].content = new Array(tables[index].options.length).fill(false);
      value.forEach(v => {
        tables[index].content[v] = true;
      });
      // tables[index].content = value;
      console.log(e)
      this.setData({
        tables: tables
      })
    },

  getSingleOptionValue(e) {
      const index = e.currentTarget.dataset.index;
      const value = e.detail.value;
      const tables = this.data.tables;
      // console.log(e)
      tables[index].content = value;
      this.setData({
        tables: tables
      })
    },

    lineInput(e) {
      const index = e.currentTarget.dataset.index;
      const value = e.detail.value;
      const tables = this.data.tables;
      tables[index].content = value;
      this.setData({
        tables: tables
      })
    },


    submitForm: function (e) {
      this.setData({
        imageUrl: ""
      })
      this.triggerEvent('onSubmit', this.data);
    },
    deleteItem(e) {
      const index = e.currentTarget.dataset.index;
      const tables = this.data.tables;
      tables.splice(index, 1);
      this.setData({
        tables: tables
      })
      this.triggerEvent('onDeleteItem', index);
    },

  ChooseImage(e) {
    const index = e.currentTarget.dataset.index;
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tables = this.data.tables;
        // tables[index].content = res.tempFiles[0].tempFilePath;
        api.uploadFile("image", res.tempFiles[0].tempFilePath).then(res=>{
          tables[index].content = res.replace("image\/", "")
          this.setData({
            tables: tables
          })
        })
        
      }
    })
  },
  DelImg(e) {
    const index = e.currentTarget.dataset.index;
    const tables = this.data.tables;
    tables[index].content = "";
    this.setData({
      tables: tables
    })
  },
  ViewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },deleteItem(e) {
      this.triggerEvent('onDeleteItem', e);
    },

  }
})