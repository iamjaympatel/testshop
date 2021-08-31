import {
  ORDER_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
} from '../constants/orderConstants'


const initialstate={
  loading:false,
  success:true,
  error:'',
  myOrders:[],  
  Listorder:[],
  order:{},
  orderItems: [], shippingAddress: {}
}

export const orderCreateReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {...state,
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {...state,
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_FAIL:
      return {...state,
        loading: false,
        error: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {...state,success:false}

//order detail  
     
      case ORDER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          order: action.payload,
        }
        
  //all order list for seller and admin
        
    case ORDER_LIST_SUCCESS:
      return {...state,
        loading: false,
        Listorder: action.payload,
      }
      //my order in profile
      case ORDER_LIST_MY_SUCCESS:
        return {...state,
          loading: false,
          myOrders: action.payload,
        }

        //order delivery reducer
        case ORDER_DELIVER_SUCCESS:
          return {...state,
            loading: false,
            success: true,
          }
        case ORDER_DELIVER_RESET:
          return {...state,success:false}

          //order pay orderPayReducer
  
          case ORDER_PAY_SUCCESS:
            return {...state,
              loading: false,
              success: true,
            }
          case ORDER_PAY_RESET:
            return {...state,success:false}
    default:
      return state
  }
}


export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
