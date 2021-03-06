// pages/game/index.js
var { audios } = require('../../assets/audios/index')
const BASE64_PRE = 'data:audio/mpeg;base64,'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musics: [
      { group: 3, musicNumber: 5 },
      { group: 3, musicNumber: 5.5 },
      { group: 3, musicNumber: 6 },
      { group: 3, musicNumber: 6.5 },
      { group: 3, musicNumber: 7 },
      { group: 4, musicNumber: 1 },
      { group: 4, musicNumber: 1.5 },
      { group: 4, musicNumber: 2 },
      { group: 4, musicNumber: 2.5 },
      { group: 4, musicNumber: 3 },
      { group: 4, musicNumber: 4 },
      { group: 4, musicNumber: 4.5 },
      { group: 4, musicNumber: 5 },
      { group: 4, musicNumber: 5.5 },
      { group: 4, musicNumber: 6 },
      { group: 4, musicNumber: 6.5 },
      { group: 4, musicNumber: 7 },
      { group: 5, musicNumber: 1 },
      { group: 5, musicNumber: 1.5 },
      { group: 5, musicNumber: 2 },
      { group: 5, musicNumber: 2.5 },
      { group: 5, musicNumber: 3 },
      { group: 5, musicNumber: 4}
    ],
    buttons: [],
    base: '_'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 初始化按钮列表
    this.setData({
      buttons: this.getButtons()
    })
    // 初始化音频对象
    this.audios = {}
    this.data.buttons.forEach(item => {
      this.audios[item.key] = wx.createAudioContext(item.key)
      this.audios['_' + item.key] = wx.createAudioContext('_' + item.key)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.audios = null
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 获取琴键列表
   */
  getButtons () {
    var musics = this.data.musics
    var result = musics.map(function (music, index) {
      let res = new Music(music)
      res.musicSrc = BASE64_PRE + audios[index]
      return res
    })
    result.forEach(item => {
      let blackStyle = `top: ${this.getBlackStyleTop(item, result)}px;`
      if (item.type === 'black') {
        item.blackStyle = blackStyle
      }
    })

    return result
  },

  /**
   * 获取黑色琴键上偏移量
   */
  getBlackStyleTop (item, list) {
    let result = ''
    if (item.type !== 'black') return
    let dGroup = item.group - list[0].group
    let dMusicNumber = item.musicNumber - list[0].musicNumber
    let offset = dGroup * 7 + dMusicNumber
    let top = parseInt(offset) * 40 + 40 - 20 / 2
    return top
  },

  onButtonTouchstart (ev) {
    let key = ev.target.dataset.key
    this.base = this.base === '_' ? '' : '_'
    let audio = this.audios[this.base + key]
    audio.seek(0.06)
    audio.play()
    
  },

  onButtonTouchend (ev) {
  }
})
function Music (options) {
  this.group = options.group
  this.musicNumber = options.musicNumber
  this.type = this.musicNumber % 1 === 0 ? 'white' : 'black'
  this.music = ''
  this.key = this.group + '-' + this.musicNumber
}