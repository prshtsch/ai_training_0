import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function getProducts() {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return {
            statusCode: response.status,
            data: response.data
        };
    } catch (error) {
        return {
            statusCode: error.response?.status || 500,
            data: null,
            error: error.message
        };
    }
} 