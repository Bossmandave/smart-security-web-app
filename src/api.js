import axios from 'axios';
import { apiBaseUrl } from './config/config';

const api = axios.create({
  baseURL: apiBaseUrl, // Flask backend URL
});

export default api;