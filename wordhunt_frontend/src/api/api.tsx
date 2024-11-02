import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 10000,
});

export const sendBoard = async (board: string[][]) => {
    try {
        const response = await api.post('http://127.0.0.1:8000/get-dictionary', 
            { board },
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log("Sent board: ", board, "Returned: ", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

