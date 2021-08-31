import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  SET_CART_ID,
  GET_CART_ITEM
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {},cartId:{} },
  action
) => {
    
     let newstate;
  switch (action.type) {
    
      case SET_CART_ID:
     
       newstate={
          ...state,
         cartId:action.payload
        }
        localStorage.setItem('cart_id',newstate.cartId);
        return newstate
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
      case GET_CART_ITEM:
        return{
          ...state,
          cartItems:action.payload
        }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
      
    default:
      return state
  }
}




