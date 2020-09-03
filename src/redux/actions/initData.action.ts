import * as types from './actionTypes'
import { createAction } from 'redux-actions'
import { ITrack } from '@config/interfaces'

export const setRecommendListDataAction = createAction(types.SET_RECOMMEND_LIST_DATA, (recommendListData: ITrack[][]) => ({ recommendListData }))