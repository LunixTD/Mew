import { ImageURISource } from "react-native"

// 播放器State
export interface IPlayerState {
  playerBoxStatus: boolean,
  status: 'pause' | 'playing',
  currentTime: number,
  duration: number,
  sliderValue: number,
  isSliding: boolean,
}

// 播放列表
export type PlaylistModalStatus = 'close' | 'open'
export interface IPlaylistState {
  playingIndex: number | null,
  playlist: ITrack[],
  modalPlaylist: ITrack[],
  playlistModalStatus: PlaylistModalStatus
}

// 通用状态
export type LockMode = 'unlocked' | 'locked-open' | 'locked-closed'
export type AuthStatus = 'pass' | 'notPass' | 'notAuth'
export type MainViewStatus = 'mount' | 'unMount' | 'notAuth'
export interface ICommonState {
  drawerLockMode: LockMode,
  mainViewStatus: AuthStatus,
  authStatus: AuthStatus,
  reloadMainView: boolean
}

// app初始化相关数据state
export interface IInitDataState {
  recommendListData: IrecommendListData
}

export interface IrecommendListData {
  recommendList: IAlbum[],
  officialTopList: IAlbum[],
  recommendTopList: IAlbum[],
  worldTopList: IAlbum[],
}

// 歌单State
export interface IAlbumState {
  userAlbum: IAlbum[],
  albumInfo: IAlbumInfo | {}
}

// 创建人对象
export interface ICreator {
  userId: number,
  defaltAvatar: boolean,
  avatarUrl: string,
  backgroundUrl: string,
  birthday: number,
  province: number,
  city: number,
  nickname: string,
  gender: number
}

// 每日推荐歌单对象
export interface IRecommendAlbum {
  id: number,
  picUrl: string,
  name: string,
  creator: ICreator,
  copywriter: string,
  trackCount: number
}

//歌单对象
export interface IAlbum {
  id: number,
  coverImgUrl: string,
  name: string,
  creator: ICreator,
  trackCount: number
}

//歌单详情对象
export interface IAlbumInfo {
  coverImgUrl: string,
  name: string,
  creator: ICreator | {},
  trackCount: number,
  tracks: ITrack[],
  commentCount: number,
  shareCount: number,
  cloudTrackCount: number
}

// 歌曲对象
export interface ITrack {
  id: number,
  ar?: IArtist[],
  name: string,
  al: {
    name: string,
    picUrl: string
  },
  playCount?: number
}

// 歌手对象
export interface IArtist {
  id: number,
  name: string
}

// 用户简介
export interface IProfile {
  userId: number,
  nickName: string,
  avatarUrl: string,
  birthday?: string,
}