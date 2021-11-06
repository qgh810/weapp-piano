
Page({
  /**
   * 页面的初始数据
   */
  data: {
    musicNames: [
      'G3',
      'Gs3',
      'A3',
      'As3',
      'B3',
      'C4',
      'Cs4',
      'D4',
      'Ds4',
      'E4',
      'F4',
      'Fs4',
      'G4',
      'Gs4',
      'A4',
      'As4',
      'B4',
      'C5',
      'Cs5',
      'D5',
      'Ds5',
      'E5',
      'F5',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAudio()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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

  onButtonTouchstart (ev) {
    console.log('touchstart');
    console.log(ev);
    const name = ev.target.dataset.name;
    const audio = createAudioByName(name);
    audio.play();
  },

  onButtonTouchend (ev) {
    console.log('touchend');
    // const name = ev.target.dataset.name;
    // const audio = this.audios[name];
    // audio.stop();
  },

  loadAudio() {
    const names = this.data.musicNames;
    names.forEach(name => {
      createAudioByName(name);
    })
  }
})

function createAudioByName(name) {
  const audio = wx.createInnerAudioContext({ useWebAudioImplement: true });
  audio.src = getUrlByName(name);
  return audio;
}

function getUrlByName(name) {
  const base = 'https://cdn.jsdelivr.net/gh/warpprism/cdn@latest/autopiano/static/samples/bright_piano/';
  return base + name + '.mp3';
}
