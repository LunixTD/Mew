// 播放器各项状态值接口
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