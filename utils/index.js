export function getWindowWidth() {
  return wx.getSystemInfoSync().windowWidth;
}

export function getWindowHeight() {
  return wx.getSystemInfoSync().windowHeight;
}

export function getStatusBarHeight() {
  const res = wx.getSystemInfoSync()
  return res.statusBarHeight;
}

const logManager = wx.getRealtimeLogManager();
export const logger = logManager.tag('test');