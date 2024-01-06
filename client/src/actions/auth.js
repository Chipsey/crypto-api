import {
  AUTH,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  AUTH_ERROR,
  FAVORITE_ERROR,
  FETCH_ALL_FAVORITE,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, payload: data });

    history.push("/");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response?.data.message });
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data });

    history.push("/");
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response?.data.message });
  }
};

export const addToFavorite = (cryptoId, userId) => async (dispatch) => {
  try {
    const cryptoData = { cryptoId };

    const token = localStorage.getItem("token");

    // console.log(token);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await api.addToFavorite(cryptoData, userId, headers);

    dispatch(getFavoriteCryptos(userId));
  } catch (error) {
    console.error(error);
  }
};

export const deleteFromFavorite = (cryptoId, userId) => async (dispatch) => {
  try {
    const cryptoData = { cryptoId };

    const token = localStorage.getItem("token");

    // console.log(token);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await api.deleteFromFavorite(cryptoData, userId, headers);

    dispatch(getFavoriteCryptos(userId));
  } catch (error) {
    console.error(error);
    dispatch({ type: FAVORITE_ERROR, payload: error.response?.data.message });
  }
};

export const getFavoriteCryptos = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const { data } = await api.getFavoriteCryptos(userId, headers);
      // console.log("data: ", data);

      dispatch({ type: FETCH_ALL_FAVORITE, payload: data });
    }
  } catch (error) {
    console.error(error);
  }
};
