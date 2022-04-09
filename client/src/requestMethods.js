import axios from "axios";


const BASE_URL_USER ="";


export const userRequest = axios.create({
  baseURL: BASE_URL_USER,
});