// lucky.ts
// 获取应用实例
Page({
  data: {
    windowWidth: 0,
    imageHeight: 0,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    blocks: [{
      padding: '35px',
      imgs: [{
          src: "/image/index/lucky-grid.png",
          width: '100%',
          height: '100%'
      }]
    }],
    prizes: [
        {
            x: 0, y: 0, range: 1, fonts: [{ text: '一等奖', fontSize: '14px' }], imgs: [{
                src: '/image/index/item.png',
                activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }]
        },
        {
            x: 1, y: 0, range: 5, fonts: [{ text: '二等奖', fontSize: '14px' }], imgs: [{
                src: '/image/index/item.png',
                activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }, {
                src: '/image/prizes-1.png',
                width: '50%',
                top: '20%'
            }
            ]
        },
        {
            x: 2, y: 0, range: 5, fonts: [{ text: '二等奖', fontSize: '14px' }], imgs: [{
              src: '/image/index/item.png',
              activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }]
        },
        {
            x: 2, y: 1, range: 9, fonts: [{ text: '三等奖', fontSize: '14px' }], imgs: [{
                src: '/image/index/item.png',
                activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }]
        },
        {
            x: 2, y: 2, range: 9, fonts: [{ text: '三等奖', fontSize: '14px' }], imgs: [{
                src: '/image/index/item.png',
                activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }]
        },
        {
            x: 1, y: 2, range: 9, fonts: [{ text: '三等奖', fontSize: '14px' }], imgs: [{
                src: '/image/index/item.png',
                activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }]
        },
        {
            x: 0, y: 2, range: 31, fonts: [{ text: '谢谢参与', fontSize: '14px' }], imgs: [{
                src: '/image/index/item.png',
                activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }]
        },
        {
            x: 0, y: 1, range: 31, fonts: [{ text: '谢谢参与', fontSize: '14px' }], imgs: [{
                src: '/image/index/item.png',
                activeSrc: '/image/index/itemActive.png',
                width: '100%',
                height: '100%'
            }]
        },
    ],
    buttons: [
        {
            x: 1, y: 1,
            range: [1, 5, 5, 9, 9, 9, 31, 31],
            background: 'rgba(0,0,0,0)',
            imgs: [{
                src: '/image/index/button.png',
                width: '100%',
                height: '100%',
            }],
        },
    ],
    defaultConfig: {
      accelerationTime: 3000,
      decelerationTime: 3000,
      gutter: 3
    },

  },
  onLoad() {
    this.setData({
      nbTitle: '抽奖',
      nbLoading: false,
      nbFrontColor: '#000000',
      nbBackgroundColor: '#ffffff',
      windowWidth: wx.getSystemInfoSync().windowWidth,
      imageHeight: wx.getSystemInfoSync().windowWidth * 1.2186,
    });
  },
  start () {
    // 获取抽奖组件实例
    const child = this.selectComponent('#myLucky')
    // 调用play方法开始旋转
    child.lucky.play()
    // 用定时器模拟请求接口
    setTimeout(() => {
      // 3s 后得到中奖索引 (假设抽到第0个奖品)
      const index = 3
      // 调用stop方法然后缓慢停止
      child.lucky.stop(index)
    }, 3000)
  },
  end (event: any) {
    // 中奖奖品详情
    console.log(event.detail)
  },
})
