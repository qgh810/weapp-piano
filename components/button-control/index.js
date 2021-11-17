import { getWindowWidth } from "../../utils/index";

// components/button-control/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    MUSIC_NAMES: Array,
    offset: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    buttonOffsetControlWidth: getWindowWidth() * 0.6,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOffsetChange(ev) {
      const offset = ev.detail;
      this.triggerEvent('offsetChange', offset);
    }
  }
})
