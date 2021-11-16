import { getWindowHeight, getWindowWidth, logger } from "../../utils/index";

const MUSIC_NAMES = [
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
]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    MUSIC_NAMES: [...MUSIC_NAMES],
    buttonsHeight: getWindowHeight() * 0.14,
    buttonsWidth: getWindowWidth(),
    boardHeight: getWindowWidth() * 0.8,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.onMemoryWarning(this.onMemoryWarning);
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
    if (!this.interstitialAd) {
      this.interstitialAd = createInterstitialAd();
    }
    this.interstitialAd.show();
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

  onMemoryWarning: function(e) {
    console.warn('内存不足', e);
    logger.warn('[page-piano]', '内存不足');
  }
})

function createInterstitialAd() {
  // 在页面中定义插屏广告
  // 在页面onLoad回调事件中创建插屏广告实例
  if (wx.createInterstitialAd) {
    return wx.createInterstitialAd({
      adUnitId: 'adunit-b0e622babb811ae9'
    })
  } else {
    return null;
  }
}