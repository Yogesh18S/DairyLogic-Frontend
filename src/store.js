import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  loading: false, // Add loading state
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'SET_LOADING': // Handle loading state
      return { ...state, loading: rest.payload }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store