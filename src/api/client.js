import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://menti-backend-aqzt.onrender.com';

const client = axios.create({
    baseURL: API_URL,
});

client.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default client;