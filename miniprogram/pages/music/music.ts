// music.ts
import { formatMinutesAndSeconds, getPercent } from '../../utils/util'
let innerAudioContext: WechatMiniprogram.InnerAudioContext;

const musicArray = [
  {
    src: 'http://music.163.com/song/media/outer/url?id=1433496995.mp3',
    poster: 'http://p3.music.126.net/rjWx5AHLuk_Du1BpnibeLA==/109951164833810818.jpg?param=300x300',
    name: '生日快乐歌 (Happy Birthday)',
    author: 'Noble Kids Chorus'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=497918887.mp3',
    poster: 'http://p4.music.126.net/OsL7lQdoSguJh73vqa7dlw==/109951163000800364.jpg?param=300x300',
    name: '生日祝福歌',
    author: '格格'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=27570622.mp3',
    poster: 'http://p3.music.126.net/NFi3ol5AL-RT2t35hBFlkg==/5724057534273557.jpg?param=300x300',
    name: '生日快乐',
    author: 'Luvea'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=427610321.mp3',
    poster: 'http://p3.music.126.net/U-YnTjWsC_7e4Zf_5reSHA==/18250793509885063.jpg?param=300x300',
    name: '生日快乐歌',
    author: 'SkyeLey'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=1453012476.mp3',
    poster: 'http://p3.music.126.net/BqbJ63r-cqIoS8P7yqz-yg==/109951165037414994.jpg?param=300x300',
    name: 'Another Piece of the Cake',
    author: 'Summer Salt'
  },
  {
    src: 'http://music.163.com/song/media/outer/url?id=1386071062.mp3',
    poster: 'http://p4.music.126.net/WpQ9VyPxHc_W_y2uKyDA2g==/109951164316024001.jpg?param=300x300',
    name: 'HBD',
    author: '舵'
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
