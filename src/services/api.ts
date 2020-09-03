import AsyncStorage from '@react-native-community/async-storage'
import request from './request'
import { func } from 'prop-types';

const { get, post } = request

// 用户手机号登陆
export const LOGIN_MOBILE = '/weapi/login/cellphone'
// 用户名登陆
export const LOGIN_USERNAME = '/weapi/login'
// 登出
export const LOGOUT = '/weapi/logout'

// banner
export const GET_BANNER = '/api/v2/banner/get'
// 用户歌单
export const GET_USER_ALBUMLIST = '/weapi/user/playlist'
// 歌单详情
export const GET_ALBUM_DETAIL = '/weapi/v3/playlist/detail'
// 音乐播放地址
export const GET_SONG_URL = '/song/url'
// 直接获取音乐播放地址
export function getMusicLink(id: number): string {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
// 首页每日歌单推荐
export const RECOMMEND_PLAYLIST = '/weapi/v1/discovery/recommend/resource'
// 推荐歌单
export const PERSONALIZED_PLAYLIST = '/weapi/personalized/playlist'
// 所有榜单
export const ALLTOPLIST = '/weapi/toplist'

// 获取每日歌单推荐
export async function getRecommendPlaylist() {
  const csrf_token = await AsyncStorage.getItem('csrf_token')
  const url = RECOMMEND_PLAYLIST + `?csrf_token=${csrf_token}`
  const res = await post(url, {})
  if (res.code === 200) {
    return res.recommend
  } else {
    return false
  }
}

// 获取所有榜单
export async function getAllToplist() {
  const res = await post(ALLTOPLIST, {})
  if (res.code === 200) {
    // console.log(res)
    return res.list
  } else {
    return false
  }
}

// 获取用户歌单列表
export async function getUserAlbum(uid: number, limit?: number, offset?: number) {
  const data = {
    uid,
    limit: limit || 30,
    offset: offset || 0
  }
  return await post(GET_USER_ALBUMLIST, data)
}

// 获取歌单详情
export async function getPlaylistDetail(id: number, s?: number) {
  const data = {
    id,
    n: 100000,
    s: s || 8
  }
  return await post(GET_ALBUM_DETAIL, data)
}
