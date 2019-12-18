import { AsyncStorage } from 'react-native'
import * as qs from "qs"
import { encryptedData } from './crypto'

const BASE_URL = 'https://music.163.com'
var Cookie = ''
const headers = {
  // 'Accept': '*/*',
  // 'Accept-Encoding': 'gzip,deflate,sdch',
  'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
  'Connection': 'keep-alive',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Host': 'music.163.com',
  'Referer': BASE_URL,
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
  'Cookie': Cookie
}
const MUSIC_U = 'c9eaf7bd8d482dc7d7db84fd1727c73761848769657aa52f407eac7f0ddc72085d3faeea406335b1a99409ba937bf2538bafcdfe5ad2b092'


function checkRequestStatus(res: any) {
  if (res.ok) {
    // const cookies = res.headers.get('set-cookie')
    // console.log(res)
    return res
  } else {
    const err = new Error(res.statusText)
    return {
      err
    }
  }
}

function parseJSONData(res: any) {
  let setCookie = res.headers.map['set-cookie']
  if (setCookie) {
    setCookie = `MUSIC_U=${MUSIC_U}; ` + setCookie
    // console.log(setCookie)
    AsyncStorage.setItem('cookies', setCookie)
    const csrf_token = setCookie.match(/_csrf=([^(;|$)]+)/)
    if (csrf_token) {
      AsyncStorage.setItem('csrf_token', csrf_token[1])
    }
  }
  return res.json()
}

function get(uri: string): Promise<any> {
  return fetch(BASE_URL + uri, {
    headers
  }).then(checkRequestStatus)
    .then(parseJSONData)
    .catch((error) => ({error}))
}

async function post(uri: string, body: {}): Promise<any>  {
  if (!Cookie) {
    const cookie = await AsyncStorage.getItem('cookies')
    Cookie = cookie ? cookie : ''
    headers.Cookie = Cookie
  }
  // console.log(Cookie)
  const csrf_token = await AsyncStorage.getItem('csrf_token')
  body['csrf_token'] = csrf_token ? csrf_token : ''
  // console.log(body)
  return fetch(BASE_URL + uri, {
    body: qs.stringify(encryptedData(body)),
    headers,
    method: 'POST'
  })
  .then(checkRequestStatus)
  .then(parseJSONData)
  .catch((error) => ({error}))
}

async function getAsyncStorage(key: string) {
  try {
    return await AsyncStorage.getItem(key)
  } catch(err) {
    return new Error(err)
  }
}

export default { get, post }