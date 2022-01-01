import { Action, ImmerReducer } from 'umi'
import { AccountCenterState as ModelState } from './data'

export interface ModelType {
  namespace: string
  state: ModelState
  reducers: {
    setArticlesNum: ImmerReducer<ModelState, Action & Pick<ModelState, 'articlesNum'>>
  }
}

const Model: ModelType = {
  namespace: 'AccountCenter',
  state: {
    articlesNum: 0
  },

  reducers: {
    setArticlesNum(state, action) {
      return {
        ...state,
        articlesNum: action.articlesNum || 0
      }
    }
  }
}

export default Model
