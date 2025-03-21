import axios from 'axios';
import { getAuthToken } from './auth';

// export const BASE_URL = process.env.API_ENDPOINT || 'http://213.136.84.124:8080';
export const BASE_URL = process.env.API_ENDPOINT || 'https://nftkash.xyz';

export const haxios = axios.create({
  baseURL: BASE_URL,
});

haxios.interceptors.request.use((config) => {
  const authToken = getAuthToken();
  if(authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});