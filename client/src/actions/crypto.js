import {
  FETCH_CRYPTOS,
  CREATE_CRYPTO,
  FETCH_CRYPTOS_BY_ID,
  FETCH_CRYPTOS_FAILURE,
  FETCH_CRYPTOS_BY_ID_FAILURE,
  CREATE_CRYPTO_FAILURE,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const fetchAllCryptos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllCryptos();
    // console.log(data);

    dispatch({ type: FETCH_CRYPTOS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_CRYPTOS_FAILURE,
      payload: error.response?.data.message,
    });
  }
};
export const fetchCryptoById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchCryptoById(id);
    console.log(data);
    dispatch({ type: FETCH_CRYPTOS_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_CRYPTOS_BY_ID_FAILURE,
      payload: error.response?.data.message,
    });
  }
};

export const deleteCrypto = (id) => async (dispatch) => {
  try {
    await api.deleteCrypto(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const addCrypto = (cryptoData) => async (dispatch) => {
  try {
    const { data } = await api.addCrypto(cryptoData);
    console.log(JSON.stringify(data).length);
    dispatch({ type: CREATE_CRYPTO, payload: data });
  } catch (error) {
    console.log("Error:", error);
    dispatch({
      type: CREATE_CRYPTO_FAILURE,
      payload: error.response?.data.error,
    });
  }
};
