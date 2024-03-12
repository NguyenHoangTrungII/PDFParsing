import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_FAILURE = "PRODUCT_FAILURE";
export const SET_STATUS = "SET_STATUS";

export const getAllProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });

    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/product`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8 ",
          },
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({ type: PRODUCT_FAILURE });
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      dispatch({
        type: FETCH_PRODUCTS,
        products: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const setStatusProduct = (id, status) => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });

    try {
      dispatch({
        type: SET_STATUS,
        id,
        status,
      });
    } catch (err) {
      throw err;
    }
  };
};
