// import { Cart } from '../../models/Cart';
import {
  ADD_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  CART_LOADING,
  CART_FAILURE,
  UPDATE_CART,
} from "../actions/cartAction";

const initialState = {
  cartItems: [],
  isLoading: false,
};

const findIndex = (cartList = [], id) => {
  let foundIndex = -1;

  cartList.map((cart, index) => {
    if (cart._id === id) {
      foundIndex = index;
    }
  });

  return foundIndex;
};

export const cartReducer = (state = initialState, action) => {
  const cartList = state.cartItems;
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_CART:
      return {
        ...state,
        cartItems: [...action.carts],
        // total: action.total,
        // totalnoship: action.totalnoship,
        isLoading: false,
      };

    case ADD_CART:
      const id = action.cartItems._id;

      if (cartList.length !== 0) {
        const index = findIndex(cartList, id);

        if (index >= 0) {
          //cartList[index].quantity = cartList[index].quantity + 1;
        } else {
          cartList.push(action.cartItems);
        }
      } else {
        cartList.push(action.cartItems);
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        isLoading: false,
      };
    case REMOVE_FROM_CART:
      const { itemId } = action;
      const indexItem = findIndex(cartList, itemId);
      cartList.splice(indexItem, 1);
      return {
        ...state,
        cartItems: [...state.cartItems],
        isLoading: false,
      };

    case UPDATE_CART: {
      const cartItemId = action.carts._id;
      const index = findIndex(cartList, cartItemId);
      cartList[index].quantity = action.carts.quantity;

      console.log(state.cartItems);
      return {
        ...state,
        cartItems: [...state.cartItems],
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
