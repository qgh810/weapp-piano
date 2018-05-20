// pages/game/index.js
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
    buttons: []
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
      if (item.type !== 'white') return
      this.audios[item.key] = wx.createAudioContext(item.key)
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
    var result = musics.map(function (music) {
      return new Music(music)
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

  onButtonTap (ev) {
    this.playMusic(ev.target.dataset.key)
  },

  playMusic (key) {
    this.lastPlay && this.lastPlay.pause()
    this.audios[key].seek(0)
    this.audios[key].play()
    this.lastPlay = this.audios[key]
  }
})
function Music (options) {
  this.group = options.group
  this.musicNumber = options.musicNumber
  this.type = this.musicNumber % 1 === 0 ? 'white' : 'black'
  this.music = ''
  this.key = this.group + '-' + this.musicNumber
  this.musicSrc = '../../assets/' + this.key + '.ogg'
}