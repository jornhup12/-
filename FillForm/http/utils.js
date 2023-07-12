function prompt(msg, status = 'loading', times = 1000) {
  wx.showToast({
    title: msg,
    icon: status,
    duration: times
  })
}

// 连接失败处理函数
const requestFail = (res) => {
  if (res.errMsg.indexOf('time out') > -1 || res.errMsg.indexOf('timeout') > -1) {
    wx.showToast({
      title: '请求超时,请检查您的网络',
      icon: 'none'
    })
  } else if (res.errMsg.indexOf('connect error') > -1) {
    wx.showToast({
      title: '当前网络不佳,请稍后重试',
      icon: 'none'
    })
  } else {
    wx.showToast({
      title: '加载数据失败,请稍后尝试',
      icon: 'none'
    })
  } 
};

module.exports = {
  prompt,
  requestFail
}