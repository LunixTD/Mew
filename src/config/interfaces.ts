// 播放器State接口
export interface IPlayerState {
  playerBoxStatus: boolean,
  status: 'pause' | 'playing',
  currentTime: number,
  duration: number,
  sliderValue: number,
  isSliding: boolean
}

// 通用状态接口
type LockMode = 'unlocked' | 'locked-open' | 'locked-closed'
export interface ICommonState {
  drawerLockMode: LockMode
}

// 歌单State接口
export interface IAlbumState {
  userAlbum: IAlbum[]
}

// 创建人对象接口
export interface ICreator {
  userId: number,
  defaltAvatar: boolean,
  avatarUrl: URL,
  backgroundUrl: URL,
  birthday: number,
  province: number,
  city: number,
  nickName: string,
  gender: number,
}

//歌单对象接口
export interface IAlbum {
  id: number,
  coverImgUrl: URL,
  name: string,
  creator: ICreator,
  trackCount: number,
}

// 歌曲对象接口
export interface ITrack {
  name: string,
  author: string
}