/*
 *
 * Category reducer
 *
 */

import {
    FETCH_CATEGORIES,
    CATEGORY_CHANGE,
    SET_CATEGORY_FORM_ERRORS,
    RESET_CATEGORY,
    TOGGLE_ADD_CATEGORY,
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    REQUEST_FAIL,FETCHING,FETCH_CATEGORY,
    UPDATE_CATEGORY
  } from '../constants/categoryConstant';
  
  const initialState = {
    categories: [],
   category:{},
   error:null,
   success:false,
   loading:false,
   
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING:
        return {
          ...state,loading:true,error:null, success:false,
        }
        case REQUEST_FAIL:
            return{
                ...state,loading:false,error:action.payload
            }
        
      case FETCH_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
          
          loading:false,
          error:null,
        };
        
      case FETCH_CATEGORY:
        return {
          ...state,
          category: action.payload,
          loading:false,
          error:null,
        };
      case ADD_CATEGORY:
        return {
          ...state,
          categories: [...state.categories, action.payload],
          success:true,
          loading:false,
          error:null,
        };
        
      case UPDATE_CATEGORY:
        return {
          ...state,
         // categories: [...state.categories, action.payload],
          success:true,
          loading:false,
          error:null,
        };
      case REMOVE_CATEGORY:
        const index = state.categories.findIndex(b => b._id === action.payload);
        return {
          ...state,
          categories: [
            ...state.categories.slice(0, index),
            ...state.categories.slice(index + 1)
          ],
          success:true,
          loading:false,
          error:null,
        };
      case CATEGORY_CHANGE:
        return {
          ...state,
          categoryFormData: { ...state.categoryFormData, ...action.payload }
        };
      case RESET_CATEGORY:
        return {
          ...state,  
          success:false,
          loading:false,
          error:null,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  