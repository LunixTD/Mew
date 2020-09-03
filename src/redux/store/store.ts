import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers/rootReducer'
import sagas from '../sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(sagaMiddleware)
)

function configureStore() {
  const store = createStore(
    rootReducer,
    enhancer
  )
  sagaMiddleware.run(sagas)
  return store
}

const store = configureStore()
export default  store