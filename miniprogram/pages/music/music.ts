// music.ts
import { formatMinutesAndSeconds, getPercent } from '../../utils/util'
let innerAudioContext: WechatMiniprogram.InnerAudioContext;

const musicArray = [
  {
    src: 'http://music.163.com/song/media/outer/url?id=28864241.mp3',
    poster: 'http://p3.music.126.net/5i5SKVW_F1ub2BgDeyjI5A==/3225967119049341.jpg?param=300x300',
    name: 'Come and Get Your Love',
    author: 'Redbone'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=1383729792.mp3',
    poster: 'http://p3.music.126.net/Vn8jKwn5SgF0LLSYMdvKRQ==/109951167480888258.jpg?param=300x300',
    name: 'Better Now',
    author: 'BLANKS'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=1411718813.mp3',
    poster: 'http://p4.music.126.net/fX_V-LW5cytW_tgutF-u_Q==/109951164577122003.jpg?param=300x300',
    name: '我是一只鱼',
    author: '落日飞车'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=77459.mp3',
    poster: 'http://p4.music.126.net/yqG6StZ2-6bLnPVELreq2A==/18581746511427307.jpg?param=300x300',
    name: '有多少爱可以重来',
    author: '迪克牛仔'
  }
]
Page({
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    poster: '',
    name: '',
    author: '',
    musicIndex: 0,
    isPlaying: false,
    progress: 0,
    duration: "00:00",
    currentTime: "00:00"
  },
  onLoad() {
    this.initAudio();
    this.setData({
      nbTitle: '音乐',
      nbLoading: false,
      nbFrontColor: '#000000',
      nbBackgroundColor: '#ffffff',
    });
    this.audioPlay();
  },
  initAudio(): void {
    innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: false
    });

    innerAudioContext.onPlay(() => {
      this.setData({
        duration: formatMinutesAndSeconds(innerAudioContext.duration),
        currentTime: formatMinutesAndSeconds(innerAudioContext.currentTime),
        progress: getPercent(innerAudioContext.currentTime, innerAudioContext.duration),
        isPlaying: true
      });
    });

    innerAudioContext.onEnded(() => {
      this.next();
    });

    innerAudioContext.onTimeUpdate(() => {
      this.setData({
        duration: formatMinutesAndSeconds(innerAudioContext.duration),
        currentTime: formatMinutesAndSeconds(innerAudioContext.currentTime),
        progress: getPercent(innerAudioContext.currentTime, innerAudioContext.duration),
        isPlaying: true
      });
    });

  },
  audioPlay: function () {
    this.setData({
      poster: musicArray[this.data.musicIndex].poster,
      name: musicArray[this.data.musicIndex].name,
      author: musicArray[this.data.musicIndex].author,
    });
    innerAudioContext.src = musicArray[this.data.musicIndex].src;
    innerAudioContext.play();
  },
  audioPause: function () {
    this.setData({
      isPlaying: false
    });
    innerAudioContext.pause();
  },
  prev: function () {
    let musicIndex = this.data.musicIndex;
    if(musicIndex <= 0) {
      musicIndex = musicArray.length - 1;
    }else {
      musicIndex -= 1;
    }
    this.setData({
      musicIndex
    });
    this.audioPlay();
  },
  next: function () {
    let musicIndex = this.data.musicIndex;
    musicIndex += 1;
    if (musicIndex >= musicArray.length) {
      musicIndex = 0;
    }
    this.setData({
      musicIndex
    });
    this.audioPlay();
  },
})
