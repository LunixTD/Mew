import * as types from '../actions/actionTypes'
import { IInitDataState } from '@config/interfaces'

const initialState: IInitDataState = {
  recommendListData: []
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.SET_RECOMMEND_LIST_DATA:
      return { ...state, recommendListData: payload.data }
    default:
      return state
  }
}