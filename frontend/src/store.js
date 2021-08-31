import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
 // productDetailsReducer,
  //productDeleteReducer,
  //productCreateReducer,
  //productUpdateReducer,
 
 
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
 // userRegisterReducer,
 // userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  //userDeleteReducer,
//  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer
  
} from './reducers/orderReducers'

import brandReducer  from './reducers/brandReducer'
import categoryReducer  from './reducers/categoryReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  productList: productListReducer,
 
  cart: cartReducer,

  userLogin: userLoginReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,  
  
  order: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  
  
  brand:brandReducer,
  category:categoryReducer,
  filter:filterReducer,
 
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: [],
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store


