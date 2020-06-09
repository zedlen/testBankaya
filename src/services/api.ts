import axios from 'axios';

export const AxiosService = axios.create({
  baseURL: 'https://pokeapi.co/',
  headers: {
    'Content-Type': 'application/json',
  },
});
