import { FETCH_ALL_FAVORITE } from "../constants/actionTypes";

const favoriteCrypto = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_FAVORITE:
      return action.payload;

    default:
      return state;
  }
};

export default favoriteCrypto;
