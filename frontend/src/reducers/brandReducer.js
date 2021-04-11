

    // brandsSelect: [],
    // selectedBrands: [],
    // brandFormData: {
    //   name: '',
    //   description: ''
    // },
    // formErrors: {},
    // editFormErrors: {},

import {
    FETCH_BRANDS,
    FETCH_STORE_BRANDS,
    FETCH_BRAND,
    RESET_BRAND,
    ADD_BRAND,
    REMOVE_BRAND,
    FETCH_BRANDs_REQUEST
  } from '../constants/brandConstatnt';
 
const initialState = {
    brands: [],
    storeBrands: [],
    brand: {
      name: '',
      description: ''
    },
    loading:false,
    success: false,
  };
  
  const brandReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BRANDs_REQUEST:
        return{
          success: false,
        ...state,loading:true
        };
      case FETCH_BRANDS:
        return {
          ...state,
          brands: action.payload,
          loading:false
        };
      case FETCH_STORE_BRANDS:
        return {
          ...state,
          storeBrands: action.payload,
          loading:false
        };
      case FETCH_BRAND:
        return {
          ...state,
          brand: action.payload,
          editFormErrors: {},
          loading:false,
          sucess:true
        };
     
      case ADD_BRAND:
        return {
          ...state,
          success: true,
          brands: [...state.brands, action.payload],
          loading:false
        };
      case REMOVE_BRAND:
        const index = state.storeBrands.findIndex(b => b._id === action.payload);
        return {
          ...state,
          storeBrands:[
            ...state.storeBrands.slice(0,index),
            ...state.storeBrands.slice(1+index),
          ],
          brands: [
            ...state.brands.slice(0, index),
            ...state.brands.slice(index + 1)
          ],
        success: true,

          loading:false
        };

      case RESET_BRAND:
        return {
          ...state,
          selectedBrands: [],
          formErrors: {},
          success: false
        };
      default:
        return state;
    }
  };
  
  export default brandReducer;
  
  //selectedProducts: [],


        // case BRAND_CHANGE:
      //   return {
      //     ...state,
      //     brandFormData: {
      //       ...state.brandFormData,
      //       ...action.payload
      //     }
      //   };
      // case FETCH_BRANDS_SELECT:
      //   return {
      //     ...state,
      //     brandsSelect: action.payload
      //   };
      // case BRAND_SELECT:
      //   return {
      //     ...state,
      //     selectedBrands: action.payload
      //   };
      // case BRAND_EDIT_CHANGE:
      //   return {
      //     ...state,
      //     brand: {
      //       ...state.brand,
      //       ...action.payload
      //     }
      //   };
      // case SET_BRAND_FORM_ERRORS:
      //   return {
      //     ...state,
      //     formErrors: action.payload
      //   };
      // case SET_BRAND_FORM_EDIT_ERRORS:
      //   return {
      //     ...state,
      //     editFormErrors: action.payload
      //   };