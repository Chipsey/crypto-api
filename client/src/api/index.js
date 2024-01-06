import axios from "axios";

const API = axios.create();
//Auth
export const signIn = (formData) =>
  API.post("http://localhost:8000/api/v1/auth/signin", formData);
export const signUp = (formData) =>
  API.post("http://localhost:8000/api/v1/auth/signup", formData);
export const addToFavorite = (cryptoData, userId, headers) =>
  API.post(
    `http://localhost:8000/api/v1/auth/addfavoritecrypto/${userId}`,
    cryptoData,
    { headers }
  );
export const deleteFromFavorite = (cryptoData, userId, headers) =>
  API.post(
    `http://localhost:8000/api/v1/auth/deleteFavoriteCrypto/${userId}`,
    cryptoData,
    { headers }
  );
export const getFavoriteCryptos = (userId, headers) =>
  API.get(`http://localhost:8000/api/v1/auth/favorite/${userId}`, { headers });

//Products
export const fetchAllCryptos = () =>
  API.get("http://localhost:8000/api/v1/crypto");
export const fetchCryptoById = (id) =>
  API.get(`http://localhost:8000/api/v1/crypto/${id}`);
export const deleteCrypto = (id) =>
  API.delete(`http://localhost:8000/api/v1/crypto/${id}`);
export const addCrypto = (cryptoData) =>
  API.post("http://localhost:8000/api/v1/crypto", cryptoData);
