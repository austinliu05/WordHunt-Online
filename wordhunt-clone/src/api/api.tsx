import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 10000,
});

export const sendBoard = async (payload: { board: string[][]; }) => {
    try {
        const response = await api.post('/get-dictonary/', payload, { headers: { 'Content-Type': 'application/json' } });
        console.log("Sent: board, Returns: Dictionary of possible words")
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
