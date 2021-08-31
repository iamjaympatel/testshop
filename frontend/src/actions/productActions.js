import axios from 'axios'
import {
  PRODUCT_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
 PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_SELECT_SUCCESS,
  PRODUCT_SELECTED, 
  PRODUCTSELLER_LIST_SUCCESS,
  PRODUCT_FAIL
} from '../constants/productConstants'
import { logout } from './userActions'


export const handleProductSelect = value => {
  return {
    type: PRODUCT_SELECTED,
    payload: value
  };
};

export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type:PRODUCT_REQUEST })

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}





export const listProductsseller = (keyword = '', pageNumber = '') => async (
  dispatch,getState
) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })

    
    const {
      userLogin: { userInfo },
    } = getState()

   const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/products/seller?keyword=${keyword}&pageNumber=${pageNumber}`,config
    )

    dispatch({
      type: PRODUCTSELLER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const listProductsAdmin = (keyword = '', pageNumber = '') => async (
  dispatch,getState
) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
   const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/products/admin?keyword=${keyword}&pageNumber=${pageNumber}`,config
    )
    dispatch({
      type: PRODUCTSELLER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type:PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type:PRODUCT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_FAIL,
      payload: message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/products`, product, config)

   
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_FAIL,
      payload:message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_FAIL,
      payload: message,
    })
  }
}

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/products/${productId}/reviews`, review, config)

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_FAIL,
      payload: message,
    })
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/top`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}





export const selectProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/select`)

    dispatch({
      type: PRODUCT_SELECT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
