import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  FAVORITE_ERROR,
} from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload.user })
      );
      localStorage.setItem("token", action?.payload.token);

      return { ...state, authData: action?.payload.user };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    case AUTH_ERROR:
      console.error(action.payload);
      return { ...state, authError: action.payload };

    case FAVORITE_ERROR:
      return { ...state, authError: action.payload };

    default:
      return state;
  }
};

export default authReducer;
