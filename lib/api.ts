import axios from 'axios';

// Membuat instance axios untuk konfigurasi yang bisa digunakan berulang kali
const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Ekspor instance axios
export default api;