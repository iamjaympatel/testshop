import { StarRate } from '@material-ui/icons'
import { 
   USER_FAIL,
  USER_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants'


const initialState={
  loading:false,
  error:'',
  userInfo:{},
  users:[],
  user:{}
}

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return {...state, loading: false, userInfo: action.payload }
    case USER_REGISTER_SUCCESS:
      return {...state, loading: false, userInfo: action.payload }
    case USER_DETAILS_SUCCESS:
      return {...state, loading: false, user: action.payload }
    case USER_DETAILS_RESET:
        return {...state, user: {} }

    case USER_LIST_SUCCESS:
        return {...state, loading: false, users: action.payload }
    case USER_LIST_RESET:
        return { users: [] }

    case USER_DELETE_SUCCESS:
      return {...state, loading: false, success: true }
    
    case USER_UPDATE_SUCCESS:
      return {...state, loading: false, success: true }

    case USER_FAIL:
      return {...state, loading: false, error: action.payload }

    case USER_LOGOUT:
      return {...state, userInfo:{},user:{},users:[]}
    default:
      return state
  }
}


export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}


