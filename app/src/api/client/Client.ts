import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  },
});

export default client
