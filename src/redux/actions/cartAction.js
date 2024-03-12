import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
import { setStatusProduct } from "./productAction";
export const CART_LOADING = "CART_LOADING";
export const CART_FAILURE = "CART_FAILURE";
export const FETCH_CART = "FETCH_CART";
export const ADD_CART = "ADD_CART";
export const RESET_CART = "RESET_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_QTY_ITEM = "ADD_QTY_ITEM";
export const CLEAR_CART = "CLEAR_CART";
export const MINUS_QTY_ITEM = "MINUS_QTY_ITEM";
export const UPDATE_CART = "UPDATE_CART";

export const fetchCart = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });

    try {
      let cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        cartItems = JSON.parse(cartItems);
      } else {
        cartItems = [];
      }

      dispatch({
        type: FETCH_CART,
        carts: cartItems,
      });
    } catch (err) {
      dispatch({
        type: CART_FAILURE,
      });
      throw new Error("Something went wrong!, can't get your carts");
    }
  };
};

export const addToCart = (product) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });

    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/product/setStatus`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8 ",
          },
          body: JSON.stringify({
            _id: product._id,
            status: true,
          }),
          method: "PATCH",
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!, can't get your carts");
      }

      let cartItems = getState().cart.cartItems;
      if (!cartItems) {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          cartItems = JSON.parse(storedCartItems);
        } else {
          cartItems = [];
        }
      }

      let existingCartItem = cartItems.find((item) => item._id === product._id);

      if (!existingCartItem) {
        let newCartItem = { ...product, quantity: 1, inCart: true };
        console.log(newCartItem);
        console.log({ ...product, quantity: 1 });
        cartItems.push(newCartItem);
        existingCartItem = newCartItem;
      } else {
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      dispatch(setStatusProduct(product._id, true));

      console.log(getState().store.products);

      dispatch({
        type: ADD_CART,
        cartItems: existingCartItem,
      });
    } catch (err) {
      dispatch({
        type: CART_FAILURE,
      });
      throw new Error("Something went wrong!");
    }
  };
};

export const removeFromCart = (itemId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });

    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/product/setStatus`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8 ",
          },
          body: JSON.stringify({
            _id: itemId,
            status: false,
          }),
          method: "PATCH",
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!, can't get your carts");
      }

      if (!response.ok) {
        dispatch({ type: CART_FAILURE });
        throw new Error("Something went wrong!");
      }

      dispatch(setStatusProduct(itemId, false));

      let cartItems = getState().cart.cartItems;
      if (!cartItems) {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          cartItems = JSON.parse(storedCartItems);
        } else {
          cartItems = [];
        }
      }

      cartItems = cartItems.filter((item) => item._id !== itemId);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      dispatch({
        type: REMOVE_FROM_CART,
        itemId,
      });
    } catch (err) {
      dispatch({
        type: CART_FAILURE,
      });
      throw new Error("Something went wrong!");
    }
  };
};

export const updateQuantity = (itemId, qty, oldqty) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });

    try {
      let cartItems = getState().cart.cartItems;
      console.log(cartItems);

      if (!cartItems) {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          cartItems = JSON.parse(storedCartItems);
        } else {
          cartItems = [];
        }
      }

      const index = cartItems.findIndex((item) => item._id === itemId);
      if (index !== -1) {
        cartItems[index].quantity = qty;
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      dispatch({
        type: UPDATE_CART,
        carts: cartItems[index],
      });
    } catch (err) {
      throw err;
    }
  };
};
