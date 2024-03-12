import {
  FETCH_PRODUCTS,
  PRODUCT_LOADING,
  PRODUCT_FAILURE,
  SET_STATUS,
} from "../actions/productAction";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_PRODUCTS:
      console.log(action);
      return {
        ...state,
        products: action.products,
        isLoading: false,
      };
    case SET_STATUS:
      state.products.forEach((product) => {
        if (product._id === action.id) {
          product.inCart = action.status;
        }
      });

      return {
        ...state,
        products: [...state.products],
        isLoading: false,
      };

    default:
      return state;
  }
};
