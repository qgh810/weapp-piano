import { getWindowHeight, getWindowWidth } from '../../utils/index';

const MUSIC_NAMES = [
  'A1',
  'As1',
  'B1',
  
  'C2',
  'Cs2',
  'D2',
  'Ds2',
  'E2',
  'F2',
  'Fs2',
  'G2',
  'Gs2',
  'A2',
  'As2',
  'B2',

  'C3',
  'Cs3',
  'D3',
  'Ds3',
  'E3',
  'F3',
  'Fs3',
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
  'Fs5',
  'G5',
  'Gs5',
  'A5',
  'As5',
  'B5',

  'C6',
  'Cs6',
  'D6',
  'Ds6',
  'E6',
  'F6',
  'Fs6',
  'G6',
  'Gs6',
  'A6',
  'As6',
  'B6',

  'C7',
]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    MUSIC_NAMES: [],
    buttonsHeight: 0,
    buttonsWidth: 0,
    offset: 0,
    ready: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
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

  onOffsetChange: function (ev) {
    this.setData({
      offset: ev.detail,
    })
  },

  initData() {
    this.setData({
      MUSIC_NAMES: [...MUSIC_NAMES],
      buttonsHeight: getWindowHeight() * 0.75,
      buttonsWidth: getWindowWidth() * 3,
      offset: 1 / 3,
      ready: true,
    })
  }
})