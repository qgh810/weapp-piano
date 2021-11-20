
// const musicNames = [
//   'F3',
//   'Fs3',
//   'G3',
//   'Gs3',
//   'A3',
//   'As3',
//   'B3',
//   'C4',
//   'Cs4',
//   'D4',
//   'Ds4',
//   'E4',
//   'F4',
//   'Fs4',
//   'G4',
//   'Gs4',
//   'A4',
//   'As4',
//   'B4',
//   'C5',
//   'Cs5',
//   'D5',
//   'Ds5',
//   'E5',
// ]

const MARGIN = 2;
const BASE_URL = 'https://cdn.jsdelivr.net/gh/warpprism/cdn@latest/autopiano/static/samples/bright_piano/';
const DEFAULT_ID = 'BUTTONS'
const ACTIVE_COLOR = '#3ebdc9'

Component({
  // options: {
  //   addGlobalClass: false,
  // },
  /**
   * 组件的对外属性，是属性名到属性设置的映射表
   */
  properties: {
    containerId: {
      type: String,
      value: DEFAULT_ID,
    },
    musicNames: Array, // string[]
    width: Number,
    height: Number,
    showText: {
      type: Boolean,
      value: false,
    },
    playable: {
      type: Boolean,
      value: true,
    },
    isShowShadow: {
      type: Boolean,
      value: true,
    },
    offset: {
      type: Number,
      value: 0,
    },
    canVibrate: {
      type: Boolean,
      value: true,
    }
  },

  /**
   * 组件的内部数据，和 properties 一同用于组件的模板渲染
   */
  data: {
    buttons: [],
    activeButtons: [],
    rootRect: null,
    scrollLeft: 0,
  },
  // 组件数据字段监听器，用于监听 properties 和 data 的变化
  observers: {
    'musicNames': function() {
      this.initButtons();
      if (this.properties.playable !== false) {
        this.preLoadAudio();
      }
    },

    'activeButtons': function() {
      this.initButtons();
    },

    'offset, width': function(offset, width) {
      this.setData({
        scrollLeft: width * offset,
      })

      this.initRootRect();
      this.initButtons();
    }
  },
  lifetimes: {
    attached: function () {
    },

    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  ready: function () {
    this.initRootRect();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initRootRect: async function() {
      const containerId = this.properties.containerId;
      const rootRect = await this.getRect(containerId);
      this.setData({
        rootRect,
      })
    },

    initButtons() {
      const {
        width: buttonsWidth,
        height: buttonsHeight,
        musicNames,
      } = this.properties;
      const whiteButtonNames = musicNames.filter(name => this.getMusicType(name) === 'white');
      const whiteButtonsCount = whiteButtonNames.length;
      const marginSize = (whiteButtonsCount + 1) * MARGIN; // 所有的margin区域的和
      const buttonWidth = (buttonsWidth - marginSize) / whiteButtonsCount;
      // const button = {
      //   name: 'c4',
      //   style: {
      //     width: '10px',
      //     height: '20px',
      //     backgroundColor: 'white',
      //     left: '20px',
      //   }
      // }

      const buttons = [];
      musicNames.forEach((name, index) => {
        const type = this.getMusicType(name);
        let width;
        let height;
        let left;
        let backgroundColor;
        let zIndex;
        let borderRadius;
        const isActive = this.isActiveButton(name);

        if (type === 'white') {
          const whiteIndex = whiteButtonNames.indexOf(name);
          width = buttonWidth;
          height = buttonsHeight - MARGIN;
          backgroundColor = '#ffffff';
          left = whiteIndex * buttonWidth + (whiteIndex + 1) * MARGIN;
          zIndex = 1;
          borderRadius = buttonWidth / 6;
      } else if (type === 'black') {
          const prevWhiteButtonName = musicNames[index - 1];
          const prevWhiteIndex = whiteButtonNames.indexOf(prevWhiteButtonName);
          const prevWhiteButtonLeft = prevWhiteIndex * buttonWidth + (prevWhiteIndex + 1) * MARGIN;

          width = buttonWidth * 0.8;
          height = (buttonsHeight - MARGIN) * 0.6;
          backgroundColor = '#000000';
          left = prevWhiteButtonLeft + buttonWidth - width / 2;
          zIndex = 2;
          borderRadius = buttonWidth / 10;
        }

        if (isActive) {
          backgroundColor = ACTIVE_COLOR;
        }
        
        const style = [
          `left: ${left}px`,
          `width: ${width}px`,
          `height: ${height}px`,
          `background-color: ${backgroundColor}`,
          `z-index: ${zIndex}`,
          `border-bottom-left-radius: ${borderRadius}px`,
          `border-bottom-right-radius: ${borderRadius}px`,
        ].join(';');

        const button = {
          name,
          type,
          left,
          width,
          height,
          style,
          backgroundColor,
        }

        buttons.push(button);
      })

      this.setData({buttons});
    },
  
    onButtonTouchstart(ev) {
      const name = ev.target.dataset.name;
      this.downButton(name);
    },

    onButtonTouchmove(ev) {
      const touchButton = this.hittest(ev);
      if (!touchButton) return;

      const name = touchButton.name;
      const activeButtons = this.data.activeButtons;
      activeButtons.filter(item => item !== name).forEach(item => {
        this.upButton(item);
      })
      this.downButton(name);
    },
  
    onButtonTouchend () {
      this.data.activeButtons.forEach(item => {
        this.upButton(item);
      })
    },
  
    /**
     * 按下按键
     * @param {} name 
     */
    downButton(name) {
      if (this.isActiveButton(name)) {
        return;
      }
      this.playAudio(name);
      this.addActiveButton(name);
    },
  
    /**
     * 放开按键
     * @param {}} name 
     */
    upButton(name) {
      this.removeActiveButton(name);
    },
  
    preLoadAudio() {
      const {
        musicNames,
      } = this.properties;
      musicNames.forEach(name => {
        createAudioByName(name);
      })
    },
  
    playAudio(name) {
      if (this.properties.playable === false) return;

      const audio = createAudioByName(name);
      audio.play();

      if (this.properties.canVibrate) {
        wx.vibrateShort();
      }
      // audio.onEnded(() => {
      //   audio.destroy();
      // })
    },
  
    addActiveButton(name) {
      const activeButtons = this.data.activeButtons;
      if (!this.isActiveButton(name)) {
        activeButtons.push(name);
      }
      this.setData({activeButtons});
    },
  
    removeActiveButton(name) {
      const activeButtons = this.data.activeButtons;
      const index = activeButtons.indexOf(name);
      if (index > -1) {
        activeButtons.splice(index, 1);
      }
      this.setData({activeButtons});
    },
  
    isActiveButton(name) {
      return this.data.activeButtons.indexOf(name) > -1;
    },
  
    getMusicType(name) {
      return {
        '2': 'white',
        '3': 'black',
      }[name.length];
    },

    hittest(ev) {
      const { touches } = ev;
      const offsetLeft = this.data.rootRect.left;
      const offsetTop = this.data.rootRect.top;

      const { clientX, clientY } = touches[0];
      const x = clientX - offsetLeft;
      const y = clientY - offsetTop;
      const butttons = this.data.buttons;

      const targetIndexs = [];

      for (let i = 0; i < butttons.length; i++) {
        const button = butttons[i];
        const { left, top = 0, width, height, type } = button;
        if (left < x && x <= left + width) {
          if (top < y && y <= top + height) {
            targetIndexs.push(i);
            if (type === 'black') {
              break;
            }
          }
        }

        if (i - targetIndexs[0] > 1) {
          break;
        }
      }

      const targetIndex = targetIndexs.pop();
      if (targetIndex !== undefined) {
        return butttons[targetIndex];
      } else {
        return null;
      }
    },

    getRect (id) {
      return new Promise((resolve) => {
        wx.createSelectorQuery().in(this).select('#' + id).boundingClientRect(function(rect){
          resolve(rect);
        }).exec()
      })
    },
    //回退
    // open(){
    //   this.setData({
    //     isClose: false
    //   })
    // },
    // close(){
    //   this.setData({
    //     isClose: true
    //   })
    // },
    // navBack: function () {
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // },
    // //回主页
    // toIndex: function () {
    //   wx.navigateTo({
    //     url: '/pages/admin/home/index/index'
    //   })
    // },
  }
})

// 缓存音频对象
const audios = {};
// 不存在的话就创建，已存在并且播放事件小于0.5的时候，也
function createAudioByName(name) {
  // 当音频不存在或者才刚开始播放的时候，重新创建音频，否则复用音频
  const isNotAudio = !audios[name];
  const isJustStartedAudio = audios[name] && audios[name].currentTime <= 0.5;

  if (isNotAudio || isJustStartedAudio) {
    const audio = wx.createInnerAudioContext({ useWebAudioImplement: true });
    audio.src = getUrlByName(name);

    if (isJustStartedAudio) {
      // 500 毫秒后销毁那个没被停止的音频
      const oldAudios = audios[name];
      setTimeout(() => {
        oldAudios.stop()
      }, 500)
    }
    audios[name] = audio;
    return audio;
  } else {
    const audio = audios[name];
    audio.stop();
    return audio;
  }
}

function getUrlByName(name) {
  return BASE_URL + name + '.mp3';
}
