import {
  FETCH_CRYPTOS,
  CREATE_CRYPTO,
  FETCH_CRYPTOS_FAILURE,
  CREATE_CRYPTO_FAILURE,
  FETCH_CRYPTOS_BY_ID_FAILURE,
} from "../constants/actionTypes";

const Crypto = (state = [], action) => {
  switch (action.type) {
    case "DELETE":
      return state.filter((crypto) => crypto.id !== action.payload);

    case FETCH_CRYPTOS:
      return action.payload;

    case CREATE_CRYPTO:
      return [...state, action.payload];

    case FETCH_CRYPTOS_FAILURE:
    case CREATE_CRYPTO_FAILURE:
    case FETCH_CRYPTOS_BY_ID_FAILURE:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default Crypto;
