import axios from 'axios';

export const API = axios.create({
  baseURL: `https://online-registration-api-new.herokuapp.com/api`
})
