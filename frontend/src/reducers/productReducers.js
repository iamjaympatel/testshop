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
  PRODUCT_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'


const initialstate={
  products:[],
  product:{reviews: []},
  error:'',
  loading:false,
  success:false,
  pages:'',
  page:'',
  sellerproducts:[],
  selectedProducts:[],
  topproducts:[]
}

export const productListReducer = (state = initialstate, action) => {
  switch (action.type) {

    
    case PRODUCT_REQUEST:
      return {...state, loading: true,error:null }
    case PRODUCT_FAIL:
      return {...state, loading: false, error: action.payload }

      //List product
    case PRODUCT_LIST_SUCCESS:
      return {...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
      
      //product detail by id
      case PRODUCT_DETAILS_SUCCESS:
        return {...state, loading: false, product: action.payload }
      
     //seller product
  
    case PRODUCTSELLER_LIST_SUCCESS:
      return {...state,
        loading: false,
        sellerproducts: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
   
  //product delete 
      case PRODUCT_DELETE_SUCCESS:
        return {...state, loading: false, success: true }

// create product 
       case PRODUCT_CREATE_SUCCESS:
      return {...state, loading: false, success: true }
    case PRODUCT_CREATE_RESET:
      return {...state,success:false}

//update product
    case PRODUCT_UPDATE_SUCCESS:
      return {...state, loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_RESET:
      return {...state,success:false }

      //select product
      case PRODUCT_SELECT_SUCCESS:
        return {...state, loading: false, products: action.payload }
      case PRODUCT_SELECTED:
        return {
           ...state,
             selectedProducts: action.payload
              };
      //top product
    case PRODUCT_TOP_SUCCESS:
      return {...state, loading: false, topproducts: action.payload }

      //product review 
      case PRODUCT_CREATE_REVIEW_SUCCESS:
        return {...state, loading: false, success: true }
      case PRODUCT_CREATE_REVIEW_RESET:
        return {...state,success:false}
   default:
      return state
  }
}

