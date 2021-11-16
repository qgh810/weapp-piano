export function getWindowWidth() {
  return wx.getSystemInfoSync().windowWidth;
}

export function getWindowHeight() {
  return wx.getSystemInfoSync().windowHeight;
}

const logManager = wx.getRealtimeLogManager();
export const logger = logManager.tag('test');