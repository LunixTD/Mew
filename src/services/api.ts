import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://192.168.2.100:4000',
  timeout: 2000
})
// banner
export const GET_BANNER = '/banner'
// 用户歌单
export const GET_USER_PLAYLIST = '/user/playlist'
// 音乐播放地址
export const GET_SONG_URL = '/song/url'
 