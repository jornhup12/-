// component/ff-publish/ff-pubilsh.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    questionnaire: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
onShareAppMessage: function(res) {
    console.log(res)
      return {
        title: this.properties.questionnaire.title,
        path: '/pages/table/table?id=' + this.properties.questionnaire.id,
      }
    },

  methods: {
  

    created() {
        console.log('participationCount:', this.properties.participationCount);
        console.log('questionnaire:', this.properties.questionnaire);
    }, fillForm: function(e) {
    this.triggerEvent('fillForm', this.data.questionnaire);
  },deleteForm: function(e) {
    this.triggerEvent('deleteForm', this.data.questionnaire);
  },onShare :function(e) {
    this.triggerEvent('onShare', this.data.questionnaire);
  }
  }
})
