import { ADD_PRODUCT, DELETE_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LOADING_PRODUCT, UPDATE_PRODUCT } from '../ActionType';

const initialState = {
  isloading: false,
  product: [],
  error: null
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PRODUCT:
      return {
        ...state,
        isloading: true
      };
    case GET_PRODUCT:
      return {
        ...state,
        isloading: false,
        product: action.payload.data,
        error: null
      };
    case ADD_PRODUCT:
      return {
        isLoading: false,
        product: state.product.concat(action.payload),
        error: null
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        isLoading: false,
        // product: state.product.map((v) => v._id === action.payload.data._id ? action.payload.data : v),
        product: state.product.map((v) => {
          if (v._id === action.payload._id) {
              return action.payload
          } else {
              return v;
          }
      })     
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: state.product.filter((v) => v._id !== action.payload),
        isloading: false,
        error: null
      };
    case ERROR_PRODUCT:
      return {
        ...state,
        isloading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

