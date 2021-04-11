/*
 *
 * Category actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_CATEGORIES,
  CATEGORY_CHANGE,
  SET_CATEGORY_FORM_ERRORS,
  RESET_CATEGORY,
  TOGGLE_ADD_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  CATEGORY_SELECT,
  REQUEST_FAIL,FETCHING,FETCH_CATEGORY,
  UPDATE_CATEGORY
} from '../constants/categoryConstant';



import handleError from '../utils/error';
//import { unformatSelectOptions } from '../../helpers/select';
import { allFieldsValidation } from '../utils/validation';

export const categoryChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CATEGORY_CHANGE,
    payload: formData
  };
};

export const toggleAddCategory = () => {
  return {
    type: TOGGLE_ADD_CATEGORY
  };
};

export const categorySelect = value => {
  return {
    type: CATEGORY_SELECT,
    payload: value
  };
};

export const fetchCategories = () =>async (dispatch, getState) => {
  dispatch({type:FETCHING})
  try {
      const response = await axios.get(`/api/category/list`);

      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.categories
      });
      //const categoryid=response.data.categories.map((m)=>{return m._id})
    } catch (error) {
      handleError(error, dispatch);
      dispatch({type:REQUEST_FAIL,payload:error.message})
    }
  };


  export const fetchCategory = (id) =>async (dispatch, getState) => {
    dispatch({type:FETCHING})
      try {
        const response = await axios.get(`/api/category/${id}`);
  
        dispatch({
          type: FETCH_CATEGORY,
          payload: response.data.category
        });
      } catch (error) {
        handleError(error, dispatch);
        dispatch({type:REQUEST_FAIL,payload:error.message})
      }
    };
  

export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    dispatch({type:FETCHING})

    try {

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const response = await axios.delete(`/api/category/delete/${id}`,config);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_CATEGORY,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
      dispatch({type:REQUEST_FAIL,payload:error})

    }
  };
};


export const addCategory = (Category) => {
  return async (dispatch, getState) => {
    dispatch({type:FETCHING})

    try {
   
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
     const response = await axios.post(`/api/category/add`, Category,config);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_CATEGORY,
          payload: response.data.category
        });
        dispatch({ type: RESET_CATEGORY });
      }
    } catch (error) {
      handleError(error, dispatch);
      dispatch({type:REQUEST_FAIL,payload:error})

    }
  };
};



export const updateCategory = (Category) => {
  return async (dispatch, getState) => {
    dispatch({type:FETCHING})

    try {
   
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
     const response = await axios.put(`/api/category/${Category._id}`, Category,config);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: UPDATE_CATEGORY,
          //payload: response.data.category
        });
        dispatch({ type: RESET_CATEGORY });
      }
    } catch (error) {
      handleError(error, dispatch);
      dispatch({type:REQUEST_FAIL,payload:error})
    }
  };
};
