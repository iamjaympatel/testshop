import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,SET_CART_ID,

  GET_CART_ITEM
} from '../constants/cartConstants'

export const addToCart = (id, qty,user) => async (dispatch, getState) => {
  //const { data } = await axios.get(`/api/products/${id}`)
  const {
    userLogin: { userInfo },
  } = getState()
//const {cart:{cartId}}=getState()
const cartId = localStorage.getItem('cart_id');

if(!cartId){
  const {data}=await axios.post(`/api/cart/add`,{product:id,qty:qty,seller:user}, 
  {headers: { Authorization: `Bearer ${userInfo.token}`}})
  dispatch( getCartItem())
}else{
  const {data}=await axios.put(`/api/cart/add/${cartId}`,{product:id,qty:qty,seller:user}, 
  {headers: { Authorization: `Bearer ${userInfo.token}`}})
    dispatch( getCartItem())
}
}


export const getCartId = () => {
  return async (dispatch, getState) => {
  try{  
      const cartId = localStorage.getItem('cart_id');
      
  const {
    userLogin: { userInfo },
  } = getState()
      // create cart id if there is no one
      if (!cartId) {
        const response = await axios.get(`/api/cart/id`,{headers: { Authorization: `Bearer ${userInfo.token}`}});

        dispatch({type:GET_CART_ITEM,payload:response.data.products})
        dispatch(setCartId(response.data.cartId));
      }
  }
  
  catch(err){
       console.log(err)
  }
}
};

export const setCartId = cartId => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_CART_ID,
      payload: cartId
    });
  };
};

export const getCartItem = () => {
  return async (dispatch, getState) => {
     try{
      const {
        userLogin: { userInfo },
      } = getState()
        
            const response = await axios.get(`/api/cart/id`,{headers: { Authorization: `Bearer ${userInfo.token}`}});   
            dispatch({type:GET_CART_ITEM,payload:response.data.products})

     }  catch(error){
       console.log(error)
     }
  };
};



export const removeFromCart = (id) => async(dispatch, getState) => {

  const cartId = localStorage.getItem('cart_id');
  const {
    userLogin: { userInfo },
  } = getState()

   await axios.delete(`/api/cart/delete/${cartId}/${id}`,{headers: { Authorization: `Bearer ${userInfo.token}`}})
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}


export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
