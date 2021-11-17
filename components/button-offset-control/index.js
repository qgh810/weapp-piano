// components/button-offset-control/index.js
const ID = 'button-offset-control';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    MUSIC_NAMES: Array,
    width: Number,
    height: Number,
    offset: Number, // 0 ~ 1
    showSize: Number, // 0 ~ 1
  },

  /**
   * 组件的初始数据
   */
  data: {
    ID,
    highlightOffsetLeft: 50,
    highlightWidth: 0,
    rootRect: null,
    lastOffset: null,
  },

  // 组件数据字段监听器，用于监听 properties 和 data 的变化
  observers: {
    'showSize, width': function(showSize, width) {
      this.setData({
        highlightWidth: width * showSize,
      })
    },

    'offset, width': function(offset, width) {
      this.setData({
        highlightOffsetLeft: width * offset,
      })
    }
  },

  ready: function () {
    this.initRootRect();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initRootRect: async function() {
      const rootRect = await this.getRect();
      this.setData({
        rootRect,
      })
    },

    onTouchEvent(ev) {
      const rootRect = this.data.rootRect;
      if (!rootRect) return;

      const touch = ev.touches[0];
      if (!touch) return;

      const clientX = touch.clientX;
      const highlightWidth = this.data.highlightWidth;
      const x = clientX - rootRect.left;
      const containerWidth = this.properties.width;
      let left = x - highlightWidth / 2;
      if (left < 0) {
        left = 0;
      } else if (left + highlightWidth > containerWidth) {
        left = containerWidth - highlightWidth;
      }
      const offset = left / containerWidth;
      const lastOffset = this.data.lastOffset;
      this.setData({
        highlightOffsetLeft: left,
        lastOffset: offset,
      })

      if (offset !== lastOffset) {
        console.log({
          containerWidth,
          left,
          offset,
        })
        this.triggerEvent('offsetChange', offset);
      }
    },

    getRect () {
      return new Promise((resolve) => {
        wx.createSelectorQuery().in(this).select('#' + ID).boundingClientRect(function(rect){
          resolve(rect);
        }).exec()
      })
    },
  }
})
