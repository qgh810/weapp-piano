const windowHeight = wx.getSystemInfoSync().windowHeight;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    musics: [
      { group: 3, musicNumber: 5, name: 'G3'},
      { group: 3, musicNumber: 5.5 , name: 'Gs3'},
      { group: 3, musicNumber: 6 , name: 'A3'},
      { group: 3, musicNumber: 6.5 , name: 'As3'},
      { group: 3, musicNumber: 7 , name: 'B3'},
      { group: 4, musicNumber: 1 , name: 'C4'},
      { group: 4, musicNumber: 1.5 , name: 'Cs4'},
      { group: 4, musicNumber: 2 , name: 'D4'},
      { group: 4, musicNumber: 2.5 , name: 'Ds4'},
      { group: 4, musicNumber: 3 , name: 'E4'},
      { group: 4, musicNumber: 4 , name: 'F4'},
      { group: 4, musicNumber: 4.5 , name: 'Fs4'},
      { group: 4, musicNumber: 5 , name: 'G4'},
      { group: 4, musicNumber: 5.5 , name: 'Gs4'},
      { group: 4, musicNumber: 6 , name: 'A4'},
      { group: 4, musicNumber: 6.5 , name: 'As4'},
      { group: 4, musicNumber: 7 , name: 'B4'},
      { group: 5, musicNumber: 1 , name: 'C5'},
      { group: 5, musicNumber: 1.5 , name: 'Cs5'},
      { group: 5, musicNumber: 2 , name: 'D5'},
      { group: 5, musicNumber: 2.5 , name: 'Ds5'},
      { group: 5, musicNumber: 3 , name: 'E5'},
      { group: 5, musicNumber: 4, name: 'F5'},
    ],
    buttons: [],
    base: '_'
  },

  audios: {},
  currentAudio: null,

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
    this.initButtons();
    this.loadMusic();
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

  initButtons() {
    const musics = this.data.musics;
    const buttons = [];
    musics.forEach(music => {
      const options = {
        ...music,
      }
      const button = new MusicButton(options);
      buttons.push(button);
    })

    buttons.forEach(button => {
      let blackStyle = `top: ${this.getBlackStyleTop(button, buttons)}px;`
      if (button.type === 'black') {
        button.blackStyle = blackStyle
      }
    })

    this.setData({
      buttons,
    })
  },

  loadMusic() {
    this.data.musics.forEach(music => {
      const name = music.name;
      const audio = this.createAudio(name);
      this.audios[name] = audio
    })
  },

  createAudio(name, { autoplay } = {autoplay: false}) {
    const audio = wx.createInnerAudioContext({ useWebAudioImplement: false });
    audio.autoplay = autoplay;
    audio.src = getUrlByName(name);
    audio.onError((res) => {
      console.error('音频加载异常');
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    // audio.onPlay(() => {
    //   console.log('playing')
    // })
    return audio
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
    const height = windowHeight * 0.06;
    let top = parseInt(offset) * height + height - height / 4;
    return top
  },

  onButtonTouchstart (ev) {
    // console.log(ev);
    const name = ev.target.dataset.name;
    const audio = this.audios[name];
    // this.currentAudio && this.currentAudio.stop();
    audio.play();
    this.currentAudio = audio;
  },

  onButtonTouchend (ev) {
    // const name = ev.target.dataset.name;
    // const audio = this.audios[name];
    // audio.stop();
  }
})

function getUrlByName(name) {
  const base = 'https://cdn.jsdelivr.net/gh/warpprism/cdn@latest/autopiano/static/samples/bright_piano/';
  return base + name + '.mp3';
}

function MusicButton (options) {
  this.group = options.group
  this.musicNumber = options.musicNumber
  this.type = this.musicNumber % 1 === 0 ? 'white' : 'black'
  this.name = options.name;
}