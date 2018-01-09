import Immutable from 'seamless-immutable'

export default function createReducer (initialState, handlers) {
  return function reducer (state = Immutable(initialState), action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
