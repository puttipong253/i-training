import axios from 'axios';

export const API = axios.create({
  baseURL: `https://online-registration-backend.herokuapp.com/api`,
})
